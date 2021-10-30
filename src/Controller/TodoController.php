<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="api_todo_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo)
        {
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();

        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (UniqueConstraintViolationException $exception) {
            return $this->json([
                'message' => ['text' => 'Error in created!', 'level' => 'error']
            ]);

        }
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'To-Do has been created!', 'level' => 'success']
        ]);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update", methods={"PUT"})
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());

        $todo->setName($content->name);

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error in update', 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'Successfully updated!', 'level' => 'success']
        ]);
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error in delete', 'level' => 'error']
            ]);

        }

        return $this->json([
            'message' => ['text' => 'Deleted!', 'level' => 'success']
        ]);
    }
}

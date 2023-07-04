<?php

require_once '../model/Category.php';

class CategoryController
{
    private $model;

    public function __construct()
    {
        $this->model = new Category();
    }

    public function getAllCategories()
    {
        $page = (!empty($_GET['page'])) ? $_GET['page'] : 1;
        $limit = 4;
        $start = ($page - 1) * $limit;

        $categories = $this->model->getRows($start, $limit);
        if (!empty($categories)) {
            $categorieslist = $categories;
        } else {
            $categorieslist = [];
        }
        $total = $this->model->getCount();
        $categoryArr = ['count' => $total, 'categories' => $categorieslist];
        echo json_encode($categoryArr);
        exit();
    }

    public function deleteCategory()
    {
        $CategoryId = (!empty($_GET['id'])) ? $_GET['id'] : '';
        if (!empty($CategoryId)) {
            $isDeleted = $this->model->deleteRow($CategoryId);
            if ($isDeleted) {
                $message = ['deleted' => 1];
            } else {
                $message = ['deleted' => 0];
            }
            echo json_encode($message);
            exit();
        }
    }

    public function addCategory()
    {
        $name = $_POST['name'];
        $CategoryData = [
            'name' => $name,
            'date_created' => date('Y-m-d H:i:s'),
        ];

        $CategoryId = $this->model->add($CategoryData);
        if (!empty($CategoryId)) {
            $Category = $this->model->getRow('id', $CategoryId);
            echo json_encode($Category);
            exit();
        }
    }

    public function getCategoryById()
    {
        $CategoryId = (!empty($_GET['id'])) ? $_GET['id'] : '';
        if (!empty($CategoryId)) {
            $Category = $this->model->getRow('id', $CategoryId);
            echo json_encode($Category);
            exit();
        }
    }

    public function updateCategory()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $CategoryData = [
            'name' => $name,
        ];

        $Category = $this->model->getRow('id', $id);
        if ($Category) {
            $this->model->update($CategoryData, $id);
            echo json_encode($Category);
            exit();
        }
    }

    public function searchCategories()
    {
        $queryString = (!empty($_GET['searchQuery'])) ? trim($_GET['searchQuery']) : '';
        $results = $this->model->searchCategory($queryString);
        echo json_encode($results);
        exit();
    }

    public function deleteSelectedCategories()
    {
        $CategoryIds = (!empty($_POST['id'])) ? $_POST['id'] : '';
        if (!empty($CategoryIds)) {
            foreach ($CategoryIds as $value) {
                $isDeleted = $this->model->deleteRow($value);
            }
            if ($isDeleted) {
                $message = ['deleted' => 1];
            } else {
                $message = ['deleted' => 0];
            }
            echo json_encode($message);
            exit();
        }
    }

    public function deleteAllCategories()
    {
        $isDeleted = $this->model->deleteRows();
        if ($isDeleted) {
            $message = ['deleted' => 1];
        } else {
            $message = ['deleted' => 0];
        }
        echo json_encode($message);
        exit();
    }
}

$controller = new CategoryController();

if (isset($_REQUEST['action'])) {
    switch ($_REQUEST['action']) {
        case 'getCategories':
            $controller->getAllCategories();
            break;
        case 'getCategory':
            $controller->getCategoryById();
            break;
        case 'addCategory':
            $controller->addCategory();
            break;
        case 'editCategory':
            $controller->updateCategory();
            break;
        case 'searchCategories':
            $controller->searchCategories();
            break;
        case 'deleteCategory':
            $controller->deleteCategory();
            break;
        case 'deleteSelectedCategories':
            $controller->deleteSelectedCategories();
            break;
        case 'deleteAllCategories':
            $controller->deleteAllCategories();
            break;
        default:
            http_response_code(500);
            echo 'Error: Action not matched';
            break;
    }
}

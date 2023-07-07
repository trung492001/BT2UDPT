<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="author" content="DoTienTrung">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BT2UDPT</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="/script.js"></script>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Quản lý công việc</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="../task/index.php">Công việc <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../category/index.php">Loại công việc</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="mx-5 mt-5">
        <div class="alert alert-success text-center message" role="alert">
        </div>

        <?php
        include_once 'addTask.php';
        include_once 'detailTask.php';
        include_once 'editTask.php';
        ?>
        <div>
            <div class="d-flex flex-row mb-3 justify-content-between">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#taskAddModal" id="addNewTaskButton">Thêm mới <i class="fa fa-solid fa-plus"></i></button>
                <button type="button" id="deleteSelectedTasksButton" class="btn btn-danger mr">Xoá</button>
            </div>
            <div class="d-flex flex-row mb-3">
                <div class="flex-fill mr-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2"><i class="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Từ khoá..." id="searchTaskInput">
                    </div>
                </div>
                <div>
                    <div class="btn-group">
                        <button type="button" id="filterResetButton" class="btn btn-outline-success">Trạng thái</button>
                        <button type="button" id="filterButton" class="btn btn-outline-success dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true">
                            <i class="fa fa-filter"></i>
                        </button>
                        <ul class="dropdown-menu" id="filterValue">
                            <li class="dropdown-item" id="filterValueTODO" value="TODO">TODO</li>
                            <li class="dropdown-item" id="filterValueINPROGRESS" value="IN PROGRESS">IN PROGRESS</li>
                            <li class="dropdown-item" id="filterValueFINISHED" value="FINISHED">FINISHED</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <?php
        include_once 'tasksTable.php';
        ?>
        <nav id="pagination"></nav>
        <input type="hidden" name="currentPage" id="currentPage" value="1">
    </div>
</body>

</html>
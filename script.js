function pagination(totalPages, currentPage) {
    var pageList = "";
    if (totalPages > 1) {
        currentPage = parseInt(currentPage);
        pageList += `<ul class="pagination justify-content-center">`;
        const prevClass = currentPage == 1 ? " disabled" : "";
        pageList += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${currentPage - 1
            }"> <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span></a></li>`;
        for (let p = 1; p <= totalPages; p++) {
            const activeClass = currentPage == p ? " active" : "";
            pageList += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
        }
        const nextClass = currentPage == totalPages ? " disabled" : "";
        pageList += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${currentPage + 1
            }">  <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span></a></li>`;
        pageList += `</ul>`;
    }

    $("#pagination").html(pageList);
}

function getTaskRow(task, isChecked) {
    var taskRow = "";
    if (task) {
        taskRow = `
        <tr>
            <td class="align-middle">
                <input type="checkbox" value="${task.id}" ${isChecked ? "checked" : ""} class="checkboxTask">  
            </td>
            <td class="align-middle">${task.name}</td>
            <td class="align-middle">${task.description}</td>
            <td class="align-middle">${task.start_date}</td>
            <td class="align-middle">${task.due_date}</td>
            <td class="align-middle">${task.category_name}</td>
            <td class="align-middle">${task.finished_date}</td>
            <td class="align-middle">${task.status}</td>
            <td class="align-middle">
              <a href="#" class="btn btn-info mr-3 detailTask" data-toggle="modal" data-target="#taskViewModal"
                title="Detail" data-id="${task.id}"><i class="fa fa-address-card-o" aria-hidden="true"></i></a>
              <a href="#" class="btn btn-warning mr-3 editTask" data-toggle="modal" data-target="#taskEditModal"
                title="Edit" data-id="${task.id}"><i class="fa fa-pencil-square-o fa-lg"></i></a>
              <a href="#" class="btn btn-danger deleteTask" title="Delete" data-id="${task.id}"><i
                  class="fa fa-trash-o fa-lg"></i></a>
            </td>
        </tr>`;
    }
    return taskRow;
}

function getTasks() {
    var pageNo = $("#currentPage").val();
    console.log(listTaskCheckedId);
    $.ajax({
        url: "../../controller/taskController.php",
        type: "GET",
        dataType: "json",
        data: { page: pageNo, action: "getTasks" },
        beforeSend: function () {
            $("#overlay").fadeIn();
        },
        success: function (rows) {
            console.log(rows);
            if (rows.tasks) {
                var tasksList = "";
                $.each(rows.tasks, function (index, task) {
                    if (allTaskChecked) {
                        if (!listTaskCheckedId.includes(task.id.toString())) {
                            listTaskCheckedId.push(task.id);
                        }
                    }
                    tasksList += getTaskRow(task, allTaskChecked || listTaskCheckedId.includes(task.id.toString()));
                });
                $("#tasksTable tbody").html(tasksList);
                let totalTasks = rows.count;
                let totalPages = Math.ceil(parseInt(totalTasks) / 4);
                const currentPage = $("#currentPage").val();
                pagination(totalPages, currentPage);
                $("#overlay").fadeOut();
            }
        },
        error: function (req, err) {
            console.log("error message: " + err + req);
        },
    });
}

function getTasksByStatus(status) {
    $.ajax({
        url: "../../controller/taskController.php",
        type: "GET",
        dataType: "json",
        data: { filterQuery: status, action: "filterTask" },
        success: function (tasks) {
            if (tasks) {
                var tasksList = "";
                $.each(tasks, function (index, task) {
                    tasksList += getTaskRow(task, allTaskChecked || listTaskCheckedId.includes(task.id.toString()));
                });
                $("#tasksTable tbody").html(tasksList);
                $("#pagination").hide();
            }
        },
        error: function (req, err) {
            console.log("error message: " + err + req);
        },
    });
}

function paginationCategory(totalPages, currentPage) {
    var pageList = "";
    if (totalPages > 1) {
        currentPage = parseInt(currentPage);
        pageList += `<ul class="pagination justify-content-center">`;
        const prevClass = currentPage == 1 ? " disabled" : "";
        pageList += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${currentPage - 1
            }">Previous</a></li>`;
        for (let p = 1; p <= totalPages; p++) {
            const activeClass = currentPage == p ? " active" : "";
            pageList += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
        }
        const nextClass = currentPage == totalPages ? " disabled" : "";
        pageList += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${currentPage + 1
            }">Next</a></li>`;
        pageList += `</ul>`;
    }

    $("#paginationCategory").html(pageList);
}

function getCategoryRow(category, isChecked) {
    var categoryRow = "";
    if (category) {
        categoryRow = `
        <tr>
            <td class="align-middle"> 
                <input type="checkbox" value="${category.id}" ${isChecked ? "checked" : ""} class="checkboxCategory">
            </td>
            <td class="align-middle">${category.name}</td>
            <td class="align-middle">${category.date_created}</td>
            <td class="align-middle">
              <a href="#" class="btn btn-info mr-3 detailCategory" data-toggle="modal" data-target="#categoryViewModal"
                title="Detail" data-id="${category.id}"><i class="fa fa-address-card-o" aria-hidden="true"></i></a>
              <a href="#" class="btn btn-warning mr-3 editCategory" data-toggle="modal" data-target="#categoryEditModal"
                title="Edit" data-id="${category.id}"><i class="fa fa-pencil-square-o fa-lg"></i></a>
              <a href="#" class="btn btn-danger deleteCategory" title="Delete" data-id="${category.id}"><i
                  class="fa fa-trash-o fa-lg"></i></a>
            </td>
        </tr>`;
    }
    return categoryRow;
}

function getCategories() {
    var pageNo = $("#currentPageCategory").val();
    $.ajax({
        url: "../../controller/categoryController.php",
        type: "GET",
        dataType: "json",
        data: { page: pageNo, action: "getCategories" },
        success: function (rows) {
            console.log(rows);
            if (rows.categories) {
                var categoriesList = "";
                $.each(rows.categories, function (index, category) {
                    categoriesList += getCategoryRow(category, allCategoryChecked || listCategoryCheckedId.includes(category.id.toString()));
                });
                $("#categoriesTable tbody").html(categoriesList);
                let totalCategories = rows.count;
                let totalPages = Math.ceil(parseInt(totalCategories) / 4);
                const currentPage = $("#currentPageCategory").val();
                paginationCategory(totalPages, currentPage);
            }
        },
        error: function (req, err) {
            console.log("error message: " + err + req);
        },
    });
}

let listTaskCheckedId = [];
let allTaskChecked = false;

let listCategoryCheckedId = [];
let allCategoryChecked = false;

$(document).ready(function () {
    if (document.location.pathname.match("/view/task/index.php")) {
        $.ajax({
            url: "../../controller/categoryController.php",
            type: "GET",
            dataType: "json",
            data: { page: 1, action: "getCategories" },
            success: function (rows) {
                console.log(rows);
                if (rows.categories) {
                    $.each(rows.categories, function (index, category) {
                        $("#categoryId").append(`<option value=${category.id}>${category.name}</option>`);
                        $("#editCategoryId").append(`<option value=${category.id}>${category.name}</option>`);
                    });
                }
            },
            error: function (req, err) {
                console.log("error message: " + err + req);
            },
        });

        $(document).on("click", "#allTask", function (event) {
            const allTask = document.getElementById("allTask");
            allTaskChecked = allTask.checked;
            if (!allTaskChecked) listTaskCheckedId = [];
            const table = document.getElementById("tasksTable");
            const checkboxes = table.querySelectorAll("input[type=checkbox]");
            const filteredCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.id !== "allTask");
            $.each(filteredCheckboxes, function (index, checkbox) {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked)
                    listTaskCheckedId.push(checkbox.value);
            });
        });

        $(document).on("click", ".checkboxTask", function (event) {
            if (event.target.checked) {
                listTaskCheckedId.push(event.target.value);
            } else {
                listTaskCheckedId = listTaskCheckedId.filter((item) => item !== event.target.value);
            }
        });

        $(document).on("submit", "#addTaskForm", function (event) {
            event.preventDefault();
            var formData = {
                name: $("#name").val(),
                description: $("#description").val(),
                start_date: $("#startDate").val(),
                due_date: $("#dueDate").val(),
                category_id: $("#categoryId").val(),
                action: "addTask",
            };

            var alertMsg = "Công việc đã được thêm thành công";
            $.ajax({
                url: "../../controller/taskController.php",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    $("#overlay").fadeIn();
                },
                success: function (response) {
                    console.log(response);
                    if (response) {
                        $("#taskAddModal").modal("hide");
                        $("#addTaskForm")[0].reset();
                        $(".message")
                            .html(alertMsg)
                            .fadeIn()
                            .delay(3000)
                            .fadeOut();
                        getTasks();
                        $("#overlay").fadeOut();
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("submit", "#editTaskForm", function (event) {
            event.preventDefault();
            var pid = $(this).data("id");
            var formData = {
                id: pid,
                name: $("#editName").val(),
                description: $("#editDescription").val(),
                start_date: $("#editStartDate").val(),
                due_date: $("#editDueDate").val(),
                category_id: $("#editCategoryId").val(),
                status: $("#editStatus").val(),
                action: "editTask",
            };

            var alertMsg = "Công việc đã được cập nhật thành công";
            $.ajax({
                url: "../../controller/taskController.php",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    $("#overlay").fadeIn();
                },
                success: function (response) {
                    console.log(response);
                    if (response) {
                        $("#taskEditModal").modal("hide");
                        $("#editTaskForm")[0].reset();
                        $(".message")
                            .html(alertMsg)
                            .fadeIn()
                            .delay(3000)
                            .fadeOut();
                        getTasks();
                        $("#overlay").fadeOut();
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("click", "ul.pagination li a", function (e) {
            e.preventDefault();
            var $this = $(this);
            const pageNum = $this.data("page");
            $("#currentPage").val(pageNum);
            getTasks();
            $this.parent().siblings().removeClass("active");
            $this.parent().addClass("active");
        });

        $(document).on("click", "a.editTask", function () {
            var pid = $(this).data("id");

            $.ajax({
                url: "../../controller/taskController.php",
                type: "GET",
                data: { id: pid, action: "getTask" },
                beforeSend: function () {
                    $("#overlay").fadeIn();
                },
                success: function (response) {
                    if (response) {
                        const task = JSON.parse(response);
                        $("#editTaskForm").data("id", task.id);
                        $("#editName").val(task.name);
                        $("#editDescription").val(task.description);
                        $("#editCategoryId").val(task.category_id);
                        $("#editStatus").val(task.status);

                        let text_start_date = task.start_date;
                        const start_date = text_start_date.split(" ");
                        $("#editStartDate").val(start_date[0]);
                        let text_due_date = task.due_date;
                        const due_date = text_due_date.split(" ");
                        $("#editDueDate").val(due_date[0]);
                    }
                    $("#overlay").fadeOut();
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("click", "a.deleteTask", function (e) {
            e.preventDefault();
            var pid = $(this).data("id");
            if (confirm("Bạn có chắc muốn xoá công việc này?")) {
                var alertMsg = "Công việc đã được xóa thành công";
                $.ajax({
                    url: "../../controller/taskController.php",
                    type: "GET",
                    dataType: "json",
                    data: { id: pid, action: "deleteTask" },
                    beforeSend: function () {
                        $("#overlay").fadeIn();
                    },
                    success: function (res) {
                        if (res.deleted == 1) {
                            $(".message")
                                .html(alertMsg)
                                .fadeIn()
                                .delay(3000)
                                .fadeOut();
                            getTasks();
                            $("#overlay").fadeOut();
                        }
                    },
                    error: function (req, err) {
                        console.log("error message: " + err + req);
                    },
                });
            }
        });

        $(document).on("click", "a.detailTask", function () {
            var pid = $(this).data("id");
            $.ajax({
                url: "../../controller/taskController.php",
                type: "GET",
                dataType: "json",
                data: { id: pid, action: "getTask" },
                success: function (task) {
                    if (task) {
                        var task_type =
                            task.category_id == 1 ? "Cá nhân" : "Công việc";
                        const detail_body = `
                        <div class="row">
                            <div class="col p-3 mb-2 bg-info text-white" class="p-3 mb-2 bg-info text-white">Tên công việc</div>
                            <div class="col p-3 mb-2 bg-info text-white">${task.name}</div>
                            <div class="w-100"></div>
                            <div class="col">Mô tả</div>
                            <div class="col">${task.description}</div>
                            <div class="w-100"></div>
                            <div class="col p-3 mb-2 bg-info text-white">Ngày bắt đầu</div>
                            <div class="col p-3 mb-2 bg-info text-white">${task.start_date}</div>
                            <div class="w-100"></div>
                            <div class="col">Ngày kết thúc</div>
                            <div class="col">${task.due_date}</div>
                            <div class="w-100"></div>
                            <div class="col p-3 mb-2 bg-info text-white">Loại</div>
                            <div class="col p-3 mb-2 bg-info text-white">${task_type}</div>
                            <div class="w-100"></div>
                            <div class="col">Ngày hoàn thành</div>
                            <div class="col">${task.finished_date}</div>
                            <div class="w-100"></div>
                            <div class="col p-3 mb-2 bg-info text-white">Trạng thái</div>
                            <div class="col p-3 mb-2 bg-info text-white">${task.status}</div> 
                        </div>`;
                        $("#detailTask").html(detail_body);
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $("#searchTaskInput").on("keyup", function () {
            const searchText = $(this).val();
            if (searchText.length > 1) {
                $.ajax({
                    url: "../../controller/taskController.php",
                    type: "GET",
                    dataType: "json",
                    data: { searchQuery: searchText, action: "searchTask" },
                    success: function (tasks) {
                        if (tasks) {
                            var tasksList = "";
                            $.each(tasks, function (index, task) {
                                tasksList += getTaskRow(task, allTaskChecked || listTaskCheckedId.includes(task.id.toString()));
                            });
                            $("#tasksTable tbody").html(tasksList);
                            $("#pagination").hide();
                        }
                    },
                    error: function (req, err) {
                        console.log("error message: " + err + req);
                    },
                });
            } else {
                getTasks();
                $("#pagination").show();
            }
        });

        $("#filterValueTODO").on("click", function () {
            getTasksByStatus("TODO");
        });
        $("#filterValueINPROGRESS").on("click", function () {
            getTasksByStatus("IN PROGRESS");
        });
        $("#filterValueFINISHED").on("click", function () {
            getTasksByStatus("FINISHED");
        });
        $("#filterResetButton").on("click", function () {
            getTasks();
            $("#pagination").show();
        });

        $("#deleteSelectedTasksButton").on("click", function () {
            if (listTaskCheckedId.length === 0) {
                alert("Chưa chọn công việc!!!");
            } else {
                if (confirm("Bạn có chắc muốn xoá công việc này?")) {
                    var alertMsg = "Công việc đã xóa thành công";
                    $.ajax({
                        url: "../../controller/TaskController.php",
                        type: "POST",
                        dataType: "json",
                        data: { id: listTaskCheckedId, action: "deleteSelectedTasks" },
                        beforeSend: function () {
                            $("#overlay").fadeIn();
                        },
                        success: function (res) {
                            if (res.deleted == 1) {
                                $(".message")
                                    .html(alertMsg)
                                    .fadeIn()
                                    .delay(3000)
                                    .fadeOut();
                                getTasks();
                                $("#overlay").fadeOut();
                            }
                        },
                        error: function (req, err) {
                            console.log("error message: " + err + req);
                        },
                    });
                    const allTask = document.getElementById("allTask");
                    if (allTask.checked) {
                        allTask.checked = false;
                        allTaskChecked = allTask.checked;
                        listTaskCheckedId = [];
                    }
                }
            }
        });

        getTasks();
    }

    if (document.location.pathname.match("/view/category/index.php")) {
        $(document).on("click", "#allCategory", function (event) {
            const allCategory = document.getElementById("allCategory");
            allCategoryChecked = allCategory.checked;
            if (!allCategoryChecked) listCategoryCheckedId = [];
            const table = document.getElementById("categoriesTable");
            const checkboxes = table.querySelectorAll("input[type=checkbox]");
            const filteredCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.id !== "allCategory");
            $.each(filteredCheckboxes, function (index, checkbox) {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked)
                    listCategoryCheckedId.push(checkbox.id);
            });
        });
        $(document).on("click", ".checkboxCategory", function (event) {
            if (event.target.checked) {
                listCategoryCheckedId.push(event.target.value);
            } else {
                listCategoryCheckedId = listCategoryCheckedId.filter((item) => item !== event.target.value);
            }
        });

        $(document).on("submit", "#addCategoryForm", function (event) {
            event.preventDefault();
            var formData = {
                name: $("#name").val(),
                action: "addCategory",
            };

            var alertMsg = "Thêm loại công việc thành công";
            $.ajax({
                url: "../../controller/categoryController.php",
                type: "POST",
                data: formData,
                success: function (response) {
                    console.log(response);
                    if (response) {
                        $("#addCategoryModal").modal("hide");
                        $("#addCategoryForm")[0].reset();
                        $(".message")
                            .html(alertMsg)
                            .fadeIn()
                            .delay(3000)
                            .fadeOut();
                        getCategories();
                    }
                },
                error: function (req, err) {
                    s
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("submit", "#editCategoryForm", function (event) {
            event.preventDefault();
            var pid = $(this).data("id");
            var formData = {
                id: pid,
                name: $("#editName").val(),
                action: "editCategory",
            };

            var alertMsg = "Cập nhật loại công việc thành công";
            $.ajax({
                url: "../../controller/categoryController.php",
                type: "POST",
                data: formData,
                success: function (response) {
                    console.log(response);
                    if (response) {
                        $("#categoryEditModal").modal("hide");
                        $("#editCategoryForm")[0].reset();
                        $(".message")
                            .html(alertMsg)
                            .fadeIn()
                            .delay(3000)
                            .fadeOut();
                        getCategories();
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("click", "ul.pagination li a", function (e) {
            e.preventDefault();
            var $this = $(this);
            const pageNum = $this.data("page");
            $("#currentPageCategory").val(pageNum);
            getCategories();
            $this.parent().siblings().removeClass("active");
            $this.parent().addClass("active");
        });

        $(document).on("click", "a.editCategory", function () {
            var pid = $(this).data("id");

            $.ajax({
                url: "../../controller/categoryController.php",
                type: "GET",
                data: { id: pid, action: "getCategory" },
                success: function (response) {
                    if (response) {
                        const category = JSON.parse(response);
                        $("#editCategoryForm").data("id", category.id);
                        $("#editName").val(category.name);
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("click", "a.detailCategory", function () {
            var pid = $(this).data("id");
            $.ajax({
                url: "../../controller/categoryController.php",
                type: "GET",
                dataType: "json",
                data: { id: pid, action: "getCategory" },
                success: function (category) {
                    if (category) {
                        const detail_body = `<div class="row">
                    <div class="col p-3 mb-2 bg-info text-white" class="p-3 mb-2 bg-info text-white">Tên loại công việc</div>
                    <div class="col p-3 mb-2 bg-info text-white">${category.name}</div>
                    <div class="w-100"></div>
                    <div class="col">Ngày tạo</div>
                    <div class="col">${category.date_created}</div>
                    <div class="w-100"></div>
                </div>`;
                        $("#detailCategory").html(detail_body);
                    }
                },
                error: function (req, err) {
                    console.log("error message: " + err + req);
                },
            });
        });

        $(document).on("click", "a.deleteCategory", function (e) {
            e.preventDefault();
            var pid = $(this).data("id");
            if (confirm("Are you sure want to delete this?")) {
                var alertMsg = "Loại công việc đã xóa thành công";
                $.ajax({
                    url: "../../controller/categoryController.php",
                    type: "GET",
                    dataType: "json",
                    data: { id: pid, action: "deleteCategory" },
                    success: function (res) {
                        if (res.deleted == 1) {
                            $(".message")
                                .html(alertMsg)
                                .fadeIn()
                                .delay(3000)
                                .fadeOut();
                            getCategories();
                        }
                    },
                    error: function (req, err) {
                        console.log("error message: " + err + req);
                    },
                });
            }
        });

        $("#searchCategoryInput").on("keyup", function () {
            const searchText = $(this).val();
            if (searchText.length > 1) {
                $.ajax({
                    url: "../../controller/categoryController.php",
                    type: "GET",
                    dataType: "json",
                    data: {
                        searchQuery: searchText,
                        action: "searchCategories",
                    },
                    success: function (categories) {
                        if (categories) {
                            var categoriesList = "";
                            $.each(categories, function (index, category) {
                                categoriesList += getCategoryRow(category);
                            });
                            $("#categoriesTable tbody").html(categoriesList);
                            $("#paginationCategory").hide();
                        }
                    },
                    error: function (req, err) {
                        console.log("error message: " + err + req);
                    },
                });
            } else {
                getCategories();
                $("#paginationCategory").show();
            }
        });

        $("#deleteSelectedCategoriesButton").on("click", function () {
            if (listCategoryCheckedId.length === 0) {
                alert("Chưa chọn loại công việc!!!");
            } else {
                if (confirm("Bạn có chắc muốn xoá loại công việc này?")) {
                    var alertMsg = "Loại công việc đã xóa thành công";
                    $.ajax({
                        url: "../../controller/CategoryController.php",
                        type: "POST",
                        dataType: "json",
                        data: {
                            id: listCategoryCheckedId,
                            action: "deleteSelectedCategories",
                        },
                        success: function (res) {
                            if (res.deleted == 1) {
                                $(".message")
                                    .html(alertMsg)
                                    .fadeIn()
                                    .delay(3000)
                                    .fadeOut();
                                getCategories();
                            }
                        },
                        error: function (req, err) {
                            console.log("error message: " + err + req);
                        },
                    });
                    if (allCategory.checked) {
                        allCategory.checked = false;
                        allCategoryChecked = allCategory.checked;
                        listCategoryCheckedId = [];
                    }
                }
            }
        });

        getCategories();
    }
});

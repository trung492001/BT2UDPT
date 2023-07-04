<!-- add form modal -->
<html>

<head>

</head>

<body>
    <div class="modal fade" id="taskEditModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập nhật công việc<i aria-hidden="true"></i></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="editTaskForm" method="POST" data-id="">
                    <div class="modal-body row">
                        <div class="form-group col-md-12">
                            <label class="col-form-label">Tên công việc</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="editName" name="editName" required="required">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <label class="col-form-label">Mô tả</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" id="editDescription" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Ngày bắt đầu</label>
                            <input type="date" id="editStartDate" name="editStartDate" value="2023-05-07">
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Ngày kết thúc</label>
                            <input type="date" id="editDueDate" name="editDueDate" value="2023-05-07">
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Loại</label>
                            <div>
                                <select class="form-select" data-style="btn-success" name="editCategoryId" id="editCategoryId">
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Trạng thái</label>
                            <div>
                                <select class="form-select" data-style="btn-success" name="editStatus" id="editStatus">
                                    <option value="TODO">TODO</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="FINISHED">FINISHED</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success" id="editTaskButton">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- add form modal end -->
</body>

</html>
<!-- add form modal -->

<div class="modal fade" id="taskAddModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Thêm công việc<i aria-hidden="true"></i></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="addTaskForm" method="POST">
                <div class="modal-body row">
                    <div class="form-group col-md-12">
                        <label class="col-form-label">Tên công việc</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="name" name="name" required="required">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="col-form-label">Mô tả</label>
                        <div class="input-group mb-3">
                            <textarea class="form-control" id="description" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label">Ngày bắt đầu</label>
                        <input type="date" id="startDate" name="startDate" value="2023-05-05">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label">Ngày kết thúc</label>
                        <input type="date" id="dueDate" name="dueDate" value="2023-05-07">
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label">Loại</label>
                        <div>
                            <select class="form-select" data-style="btn-success" name="categoryId" id="categoryId">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-success" id="addTaskButton">Tạo</button>
                </div>
            </form>
        </div>
    </div>
</div>
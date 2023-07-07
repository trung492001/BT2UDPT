<div class="modal fade" id="categoryEditModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Cập nhật loại công việc<i aria-hidden="true"></i></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="editCategoryForm" method="POST" data-id="">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label">Tên loại công việc</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="editName" name="editName" required="required">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-success" id="editCategoryButton">Cập nhật</button>
                </div>
            </form>
        </div>
    </div>
</div>
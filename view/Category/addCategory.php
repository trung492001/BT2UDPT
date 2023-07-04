<!-- add form modal -->
<html>

<head>

</head>

<body>
    <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm<i aria-hidden="true"></i></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="addCategoryForm" method="POST">
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="col-form-label">Tên loại công việc</label>
                            <div class="input-group mb-3">
                                <!-- <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                </div> -->
                                <input type="text" class="form-control" id="name" name="name" value="test" required="required">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success" id="addCategoryButton">Tạo</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- add form modal end -->
</body>

</html>
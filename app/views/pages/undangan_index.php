<form action="#">
    <div class="card mb-2">
        <div class="card-body">
            <div class="position-relative w-md-400px me-md-2">
                <span class="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                        <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
                    </svg>
                </span>
                <input type="text" class="form-control form-control-solid ps-10" id="search-input-undangan" placeholder="Search">
            </div>
        </div>
    </div>
</form>

<div class="my-2">
    <div id="kt_datatable_example_6_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
        <div class="table-responsive">
            <table id="kt_datatable_example_6" class="table table-striped border rounded gy-5 gs-7 dataTable no-footer dtr-inline collapsed" aria-describedby="kt_datatable_example_6_info" style="width: 649px;">
                <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                        <th class="min-w-300px sorting" data-priority="1" tabindex="0" aria-controls="kt_datatable_example_6" rowspan="1" colspan="1" style="width: 469.25px;" aria-label="Name: activate to sort column ascending">Name</th>
                        <th data-priority="1" tabindex="0" aria-controls="kt_datatable_example_6" rowspan="1" colspan="1" style="width: 124.5px;" aria-label="Salary: activate to sort column descending" aria-sort="ascending">From</th>
                    </tr>
                </thead>
                <tbody class="main-table"></tbody>
                <tbody class="filtered-table" style="display: none;"></tbody>
            </table>
            <div class="scroll-loader">
                <img src="<?php echo base_url('assets/others/scroll_loader.gif'); ?>" alt="" srcset="">
            </div>
            <div class="text-center my-8" style="display: none;">
                <a href="javascript:void(0)" class="btn-load-more">Load more</a>
            </div>
        </div>
    </div>
</div>
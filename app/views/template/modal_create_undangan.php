<div class="modal fade" id="kt_modal_create_undangan" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen p-0">
        <div class="modal-content">
            <div class="modal-header py-7 d-flex justify-content-between">
                <h2>Buat Undangan</h2>
                <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                    <span class="svg-icon svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                        </svg></span>
                </div>
            </div>
            <div class="modal-body scroll-y m-5">
                <div class="stepper stepper-links d-flex flex-column" id="kt_modal_create_undangan_stepper">
                    <div class="stepper-nav justify-content-center py-2">
                        <div class="stepper-item me-5 me-md-15 current" data-kt-stepper-element="nav">
                            <h3 class="stepper-title">Detail Undangan</h3>
                        </div>
                    </div>
                    <form class="mx-auto w-100 mw-600px pt-15 pb-10" id="form-data-undangan" data-submit="new">
                        <div class="current" data-kt-stepper-element="content">
                            <div class="w-100">
                                <div class="mb-10">
                                    <label class="required fw-bold fs-6 mb-5">Jenis Undangan</label>
                                    <div class="d-flex fv-row">
                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input me-3 undangan-type" name="undangan-type" type="radio" value="O" id="kt_modal_update_role_option_0" checked="checked" />
                                            <label class="form-check-label" for="kt_modal_update_role_option_0">
                                                <div class="fw-bolder text-gray-800">
                                                    Perorang
                                                </div>
                                                <div class="text-gray-600">
                                                    Undangan ditujukan untuk satu orang.
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="separator separator-dashed my-5"></div>
                                    <div class="d-flex fv-row">
                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input me-3 undangan-type" name="undangan-type" type="radio" value="G" id="kt_modal_update_role_option_1" />
                                            <label class="form-check-label" for="kt_modal_update_role_option_1">
                                                <div class="fw-bolder text-gray-800">
                                                    Grup
                                                </div>
                                                <div class="text-gray-600">
                                                    Undangan ditujukan untuk sebuah grup.
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="required form-label mb-3">Nama</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-person-name" undangan-type="O" placeholder="Nama Seseorang" required minlength="3" />
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="form-label mb-3">Relation Header</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-relation-header" placeholder="Ex: Temanku (default: Bapak/Ibu Saudara/i)" />
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="form-label mb-3">Relation Body</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-relation-body" placeholder="Ex: Temanku (default: Bapak/Ibu Saudara/i)" />
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="form-label mb-3">With</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-person-partner" placeholder="Ex: Suami (default: Keluarga)" />
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="form-label mb-3">Lokasi</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-person-location" placeholder="Ex: Jakarta (default: tempat)" />
                                </div>
                                <div class="mb-10 fv-row">
                                    <label class="form-label mb-3">Whatsapp</label>
                                    <input type="text" class="form-control form-control-lg form-control-solid" id="input-phone-number" placeholder="(default: kosong)" />
                                </div>
                                <div class="mb-10">
                                    <div class="form-check form-switch form-check-custom form-check-solid">
                                        <input class="form-check-input" type="checkbox" value="1" id="is-active-undangan" checked="checked">
                                        <label class="form-check-label noselect" for="is-active-undangan">Aktifkan Undangan</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-stack pt-10">
                            <div>
                                <button type="submit" class="btn btn-lg btn-primary">
                                    Simpan
                                    <span class="svg-icon svg-icon-3 ms-1 me-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="black" />
                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
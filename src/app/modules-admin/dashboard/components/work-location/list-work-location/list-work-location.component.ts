import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseMaster } from 'src/app/modules-admin/layout/services/master/model/base';
import { WorkLocationService } from 'src/app/modules-admin/layout/services/master/work-locations.service';

@Component({
  selector: 'app-list-work-location',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-work-location.component.html',
  styleUrl: './list-work-location.component.css'
})
export class ListWorkLocationComponent {
  loading = false;
  error = '';

  items: BaseMaster[] = [];

  // pagination
  page = 0;
  size = 5;
  total = 0;
  totalPages = 0;
  pageSizes = [5, 10, 15, 20, 25];

  // modal
  modalOpen = false;
  mode: 'create' | 'edit' = 'create';
  editingId: number | null = null;

  form = this.fb.group({
    nameTh: ['', [Validators.required]],
    nameEn: ['', [Validators.required]],
    description: [''],
  });

  constructor(private fb: FormBuilder, private service: WorkLocationService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';

    this.service.list(this.page, this.size).subscribe({
      next: (res: any) => {
        this.items = res?.items ?? [];
        this.total = res?.total ?? 0;
        this.page = res?.page ?? this.page;
        this.size = res?.size ?? this.size;
        this.totalPages = res?.totalPages ?? Math.ceil(this.total / this.size);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Load work locations failed';
      },
    });
  }

  // pagination
  prevPage(): void {
    if (this.page <= 0) return;
    this.page--;
    this.load();
  }

  nextPage(): void {
    if (this.page >= this.totalPages - 1) return;
    this.page++;
    this.load();
  }

  changePageSize(raw: any): void {
    const s = Number(raw);
    if (!s || s === this.size) return;
    this.size = s;
    this.page = 0;
    this.load();
  }

  // modal
  openCreate(): void {
    this.mode = 'create';
    this.editingId = null;
    this.form.reset({ nameTh: '', nameEn: '', description: '' });
    this.modalOpen = true;
  }

  openEdit(item: BaseMaster): void {
    this.mode = 'edit';
    this.editingId = (item as any).id ?? null;

    this.form.reset({
      nameTh: (item as any).nameTh ?? '',
      nameEn: (item as any).nameEn ?? '',
      description: (item as any).description ?? '',
    });

    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: BaseMaster = {
      nameTh: this.form.value.nameTh!,
      nameEn: this.form.value.nameEn!,
      description: this.form.value.description ?? '',
    } as any;

    this.loading = true;
    this.error = '';

    if (this.mode === 'create') {
      this.service.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.load();
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message ?? 'Create failed';
        },
      });
      return;
    }

    if (!this.editingId) {
      this.loading = false;
      this.error = 'Missing id';
      return;
    }

    this.service.update(this.editingId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.load();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Update failed';
      },
    });
  }

  remove(item: BaseMaster): void {
    const id = (item as any).id;
    if (id == null) {
      this.error = 'Missing id';
      return;
    }

    const ok = confirm(`ยืนยันลบ Work Location: ${(item as any).nameTh || (item as any).nameEn || id} ?`);
    if (!ok) return;

    this.loading = true;
    this.error = '';

    this.service.delete(id).subscribe({
      next: () => {
        this.loading = false;
        if (this.page > 0 && this.items.length === 1) this.page--;
        this.load();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Delete failed';
      },
    });
  }

  trackById = (_: number, item: BaseMaster) => this.getId(item);

  getId(w: BaseMaster): number {
    return (w as any).id ?? 0;
  }

  getNameEn(w: BaseMaster): string {
    return (w as any).nameEn ?? '';
  }

  getNameTh(w: BaseMaster): string {
    return (w as any).nameTh ?? '';
  }

  getDesc(w: BaseMaster): string {
    return (w as any).description ?? '';
  }

}

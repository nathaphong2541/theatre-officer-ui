import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseMaster } from 'src/app/modules-admin/layout/services/master/model/base';
import { PersonalIdentityService } from 'src/app/modules-admin/layout/services/master/personal-identity.service';

@Component({
  selector: 'app-list-personal-identity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-personal-identity.component.html',
  styleUrl: './list-personal-identity.component.css'
})
export class ListPersonalIdentityComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private service: PersonalIdentityService) { }

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
        this.error = err?.message ?? 'Load personal identities failed';
      },
    });
  }

  // pagination
  prevPage(): void { if (this.page <= 0) return; this.page--; this.load(); }
  nextPage(): void { if (this.page >= this.totalPages - 1) return; this.page++; this.load(); }

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
    this.editingId = this.getId(item);

    this.form.reset({
      nameTh: this.getNameTh(item),
      nameEn: this.getNameEn(item),
      description: this.getDesc(item),
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
    const id = this.getId(item);
    if (!id) { this.error = 'Missing id'; return; }

    const ok = confirm(`ยืนยันลบ Personal Identity: ${this.getNameTh(item) || this.getNameEn(item) || id} ?`);
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

  // helpers (กัน template cast)
  getId(x: BaseMaster): number { return (x as any).id ?? 0; }
  getNameEn(x: BaseMaster): string { return (x as any).nameEn ?? ''; }
  getNameTh(x: BaseMaster): string { return (x as any).nameTh ?? ''; }
  getDesc(x: BaseMaster): string { return (x as any).description ?? ''; }

  trackById = (_: number, item: BaseMaster) => this.getId(item);
}

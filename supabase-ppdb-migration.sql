-- ============================================================
-- PPDB 2027/2028 : form baru (ukuran seragam + upload berkas)
-- Cara pakai: Supabase Dashboard > SQL Editor > paste > Run
-- ============================================================

-- 1) Kolom baru di tabel pendaftaran
alter table pendaftaran add column if not exists ukuran_seragam text;
alter table pendaftaran add column if not exists bukti_bayar_url text;
alter table pendaftaran add column if not exists foto_siswa_url text;

-- 2) Bucket "ppdb-files" dibuat via Dashboard:
--    Storage > New bucket > Name: ppdb-files > Public: ON > Create
--    (Public agar foto langsung tampil di panel admin tanpa signed URL.
--     Keamanan via nama file acak + tanpa akses LIST, lihat policy di bawah.)

-- 3) Policy storage (JALANKAN INI di SQL Editor setelah bucket dibuat):
--    Calon wali murid (anon, tanpa login) boleh UPLOAD + BACA,
--    tapi TIDAK boleh ubah/hapus/daftar isi bucket.
create policy "ppdb-files public upload"
on storage.objects for insert to anon
with check (bucket_id = 'ppdb-files');

create policy "ppdb-files public read"
on storage.objects for select to anon
using (bucket_id = 'ppdb-files');

-- 4) Verifikasi:
-- select ukuran_seragam, bukti_bayar_url, foto_siswa_url from pendaftaran limit 1;

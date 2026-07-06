# Todo List App

Ung dung quan ly cong viec don gian - them, sua, xoa, danh dau hoan thanh, tim kiem va loc cong viec.

Xem thu online: https://todou-1.onrender.com
(Server free nen co the mat ~50 giay de khoi dong lan dau, kien nhan cho nhe)

## Cong nghe dung

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Atlas)

## Tinh nang

- Xem danh sach cong viec
- Them cong viec moi (co the chon ngay het han)
- Sua ten cong viec
- Xoa cong viec
- Danh dau hoan thanh / chua hoan thanh
- Tim kiem theo ten
- Loc theo trang thai (Tat ca / Chua xong / Hoan thanh)
- Loc theo ngay het han

## Cach chay o may tinh cua ban

### Can co truoc
- Node.js (ban 18 tro len)
- Mot tai khoan MongoDB Atlas mien phi (https://www.mongodb.com/cloud/atlas)

### Buoc 1: Tai code ve

git clone https://github.com/kiteisme/TodoU.git
cd TodoU

### Buoc 2: Chay Backend

cd Backend
npm install

Tao file .env trong thu muc Backend, ghi vao:
MONGO_URI=chuoi_ket_noi_MongoDB_cua_ban

Chay:
npm run dev

Neu thay "Server is running on port 3000" va "MongoDB connected successfully" la thanh cong.

### Buoc 3: Chay Frontend

Mo terminal moi (khong tat terminal Backend), roi:

cd Frontend
npm install
npm run dev

Mo trinh duyet vao http://localhost:5173 de dung app.

Luu y: phai chay ca Backend va Frontend cung luc thi app moi hoat dong duoc.

## Cau truc thu muc

TodoU/
- Backend/    -> API xu ly du lieu (Node.js + Express + MongoDB)
- Frontend/   -> Giao dien nguoi dung (React)
- package.json -> dung khi deploy len Render

## API chinh (Backend)

| Chuc nang | Method | Duong dan |
|---|---|---|
| Lay danh sach | GET | /api/tasks |
| Them moi | POST | /api/tasks |
| Cap nhat | PUT | /api/tasks/:id |
| Xoa | DELETE | /api/tasks/:id |

---
Tac gia: Tran Minh Kiet

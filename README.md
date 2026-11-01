# CarWash PWA

CarWash 的手機優先網頁版，使用 React、TypeScript、Vite 與 PWA。此專案會沿用既有的 Supabase 專案與資料表，不另建資料庫。

## 目前進度

- [x] React + TypeScript + Vite 基礎架構
- [x] PWA manifest 與應用程式圖示
- [x] 手機優先的響應式版面
- [x] 儀表板、洗車紀錄、客戶與車輛、定期維護、設定頁面
- [x] 主要頁面導覽、搜尋、篩選與新增洗車紀錄表單互動
- [ ] 連接既有 Supabase 專案
- [ ] 以真實資料取代畫面中的示意資料
- [ ] 實作完整新增、讀取、編輯、刪除與資料驗證
- [ ] 部署與實機安裝測試

**注意：目前畫面中的營收、筆數、客戶及維護項目都是示意資料。** 新增洗車紀錄表單目前只展示介面流程，不會寫入資料庫，也不會發送 Supabase 請求。

## 本機開發

需要安裝 Node.js（建議使用目前仍受支援的 LTS 版本）與 npm。

```bash
git clone https://github.com/870721chen/CarWash_PWA.git
cd CarWash_PWA
npm install
npm run dev
```

Vite 會在終端機顯示本機預覽網址。

檢查正式建置：

```bash
npm run build
npm run preview
```

## 主要技術

- React + TypeScript
- Vite
- lucide-react 圖示
- vite-plugin-pwa
- Supabase（下一階段整合既有專案）

## Supabase 整合原則

1. 沿用現有 CarWash Supabase 專案與既有資料表。
2. 先核對實際欄位、外鍵與 Row Level Security（RLS）政策，再實作資料存取。
3. 前端環境變數只放 Supabase Project URL 與 anon/publishable key。
4. **不得將 Supabase service_role key 或其他管理員密鑰放入前端、GitHub 檔案或公開環境變數。**
5. 先完成唯讀查詢與錯誤處理，再逐項加入寫入功能。
6. 暫不實作離線寫入，避免在資料同步規則尚未定義時產生資料衝突。

## 目錄

```text
CarWash_PWA/
├── public/
│   ├── favicon.svg
│   ├── pwa-192.svg
│   └── pwa-512.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig*.json
```

import { useMemo, useState, type ReactNode } from 'react';
import {
  Activity, Bell, CalendarDays, CarFront, Check, ChevronDown,
  ChevronRight, CircleHelp, Droplets, Ellipsis, FileText, LayoutDashboard,
  Menu, Plus, Search, Settings2, SlidersHorizontal, Sparkles,
  Users, Wrench, X, Wallet, type LucideIcon
} from 'lucide-react';

type PageKey = 'dashboard' | 'records' | 'customers' | 'maintenance' | 'settings';

const navItems: { key: PageKey; label: string; icon: LucideIcon }[] = [
  { key: 'dashboard', label: '總覽', icon: LayoutDashboard },
  { key: 'records', label: '洗車紀錄', icon: FileText },
  { key: 'customers', label: '客戶與車輛', icon: Users },
  { key: 'maintenance', label: '定期維護', icon: Wrench },
  { key: 'settings', label: '設定', icon: Settings2 },
];

const initialRecords = [
  { id: 'CW-1038', name: '林先生', plate: 'ABC-1234', vehicle: 'BMW 320i', service: '精緻洗車', amount: 600, time: '13:20', payment: 'LINE Pay', status: '已完成' },
  { id: 'CW-1037', name: '陳小姐', plate: 'BDE-6088', vehicle: 'Mercedes-Benz A180', service: '標準洗車', amount: 350, time: '11:45', payment: '現金', status: '已完成' },
  { id: 'CW-1036', name: '王先生', plate: 'KLM-5521', vehicle: 'Tesla Model 3', service: '精緻洗車', amount: 600, time: '10:30', payment: '轉帳', status: '已完成' },
  { id: 'CW-1035', name: '張小姐', plate: 'QWE-9172', vehicle: 'Toyota Corolla Cross', service: '標準洗車', amount: 350, time: '09:10', payment: '現金', status: '已完成' },
];

const customerRows = [
  { name: '林先生', phone: '0912-***-328', plate: 'ABC-1234', car: 'BMW 320i', visits: 18, last: '今天 13:20' },
  { name: '陳小姐', phone: '0988-***-215', plate: 'BDE-6088', car: 'Mercedes-Benz A180', visits: 12, last: '今天 11:45' },
  { name: '王先生', phone: '0933-***-761', plate: 'KLM-5521', car: 'Tesla Model 3', visits: 9, last: '今天 10:30' },
  { name: '張小姐', phone: '0921-***-846', plate: 'QWE-9172', car: 'Toyota Corolla Cross', visits: 6, last: '今天 09:10' },
  { name: '黃先生', phone: '0966-***-509', plate: 'RTY-3310', car: 'Lexus NX200', visits: 15, last: '昨天 16:40' },
];

const maintenanceRows = [
  { plate: 'ABC-1234', owner: '林先生', car: 'BMW 320i', item: '內裝深層清潔', due: '今天', days: '已到期', tone: 'urgent' },
  { plate: 'RTY-3310', owner: '黃先生', car: 'Lexus NX200', item: '皮革保養', due: '明天', days: '剩 1 天', tone: 'soon' },
  { plate: 'KLM-5521', owner: '王先生', car: 'Tesla Model 3', item: '玻璃鍍膜檢查', due: '11/04', days: '剩 3 天', tone: 'normal' },
];

const money = (value: number) => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value);

function App() {
  const [page, setPage] = useState<PageKey>('dashboard');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');
  const [recordSearch, setRecordSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredRecords = useMemo(() => initialRecords.filter((r) =>
    [r.name, r.plate, r.id, r.service].some((v) => v.toLowerCase().includes(recordSearch.toLowerCase()))
  ), [recordSearch]);

  const filteredCustomers = useMemo(() => customerRows.filter((r) =>
    [r.name, r.phone, r.plate, r.car].some((v) => v.toLowerCase().includes(customerSearch.toLowerCase()))
  ), [customerSearch]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const pageTitle = navItems.find((item) => item.key === page)?.label ?? '儀表板';

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Droplets size={22} strokeWidth={2.3} /></div>
          <div><div className="brand-name">CarWash</div><div className="brand-subtitle">智慧洗車管理</div></div>
          <button className="icon-button sidebar-close" aria-label="關閉選單" onClick={() => setMobileMenu(false)}><X size={19} /></button>
        </div>
        <div className="workspace-label">功能選單</div>
        <nav className="side-nav" aria-label="主要導覽">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} className={`nav-item ${page === key ? 'active' : ''}`} onClick={() => { setPage(key); setMobileMenu(false); }}>
              <Icon size={19} strokeWidth={1.9} /><span>{label}</span>{key === 'maintenance' && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sync-status"><span className="status-dot" /><div><strong>介面預覽模式</strong><span>尚未連接雲端資料</span></div></div>
          <button className="profile-row" onClick={() => setPage('settings')}>
            <div className="avatar">管</div><div className="profile-copy"><strong>管理員</strong><span>系統管理</span></div><Ellipsis size={18} className="profile-more" />
          </button>
        </div>
      </aside>

      {mobileMenu && <button className="mobile-scrim" aria-label="關閉導覽" onClick={() => setMobileMenu(false)} />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu-button" aria-label="開啟選單" onClick={() => setMobileMenu(true)}><Menu size={21} /></button>
            <div className="breadcrumb"><span>工作空間</span><ChevronRight size={14} /><strong>{pageTitle}</strong></div>
          </div>
          <div className="topbar-actions">
            {showSearch ? (
              <div className="top-search"><Search size={17} /><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && search.trim()) { setRecordSearch(search.trim()); setPage('records'); setShowSearch(false); } }} placeholder="搜尋車牌、客戶…（Enter 查看紀錄）" /><button className="icon-button" onClick={() => { setShowSearch(false); setSearch(''); }} aria-label="關閉搜尋"><X size={16} /></button></div>
            ) : <button className="icon-button top-search-trigger" aria-label="搜尋" onClick={() => setShowSearch(true)}><Search size={19} /></button>}
            <button className="icon-button notification-button" aria-label="通知" onClick={() => notify('目前有 3 筆定期維護待處理')}><Bell size={19} /><span /></button>
            <div className="top-avatar">管</div>
          </div>
        </header>

        {page === 'dashboard' && <Dashboard onNavigate={setPage} onAdd={() => setShowAdd(true)} onNotify={notify} />}
        {page === 'records' && <Records records={filteredRecords} search={recordSearch} setSearch={setRecordSearch} onAdd={() => setShowAdd(true)} />}
        {page === 'customers' && <Customers customers={filteredCustomers} search={customerSearch} setSearch={setCustomerSearch} onNotify={notify} />}
        {page === 'maintenance' && <Maintenance onNotify={notify} />}
        {page === 'settings' && <Settings onNotify={notify} />}
      </main>

      {page === 'dashboard' && <button className="mobile-fab" aria-label="新增洗車紀錄" onClick={() => setShowAdd(true)}><Plus size={23} /></button>}
      <nav className="mobile-bottom-nav" aria-label="手機導覽">
        {navItems.slice(0, 5).map(({ key, label, icon: Icon }) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => setPage(key)}>
            <span className="mobile-nav-icon"><Icon size={20} strokeWidth={1.9} />{key === 'maintenance' && <i />}</span><span>{label}</span>
          </button>
        ))}
      </nav>

      {showAdd && <AddRecordModal onClose={() => setShowAdd(false)} onSave={() => { setShowAdd(false); notify('介面預覽：紀錄尚未寫入資料庫'); }} />}
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>;
}

function Dashboard({ onNavigate, onAdd }: { onNavigate: (page: PageKey) => void; onAdd: () => void; onNotify: (message: string) => void }) {
  return (
    <div className="page-content dashboard-page">
      <PageHeading title="營運總覽" description="所有洗車服務與客戶資訊，一目了然。" />
      <section className="metric-grid" aria-label="營運指標">
        <MetricCard icon={Droplets} label="今日洗車數" value="4" note="今日服務紀錄" tone="gold" />
        <MetricCard icon={Users} label="累積客戶" value="5" note="客戶資料筆數" tone="gold" />
        <MetricCard icon={Wallet} label="今日營收" value="$1,900" note="今日服務金額合計" tone="green" />
        <MetricCard icon={CalendarDays} label="本月洗車數" value="4" note="本月服務紀錄" tone="orange" />
      </section>

      <section className="dashboard-sections">
        <div className="panel recent-panel">
          <div className="panel-heading exe-panel-heading"><h2>最近洗車紀錄</h2><button className="button button-secondary" onClick={() => onNavigate('records')}>查看全部</button></div>
          <div className="recent-table-scroll">
            <table className="recent-table">
              <thead><tr><th>日期</th><th>客戶</th><th>車牌</th><th>品牌/車型</th><th>施作項目</th><th>附加項目</th><th>金額</th><th>備註</th></tr></thead>
              <tbody>{initialRecords.map((r) => (
                <tr key={r.id} onClick={() => onNavigate('records')} className="clickable-record">
                  <td>示意日期</td><td>{r.name}</td><td><strong>{r.plate}</strong></td><td>{r.vehicle}</td><td>{r.service}</td><td>無</td><td className="amount-cell">{money(r.amount)}</td><td>無</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="mobile-recent">{initialRecords.map((r) => (
            <button className="mobile-recent-row" key={r.id} onClick={() => onNavigate('records')}>
              <span><strong>{r.plate}</strong><small>{r.name} · {r.vehicle}</small></span>
              <span className="recent-amount"><strong>{money(r.amount)}</strong><small>{r.service}</small></span>
            </button>
          ))}</div>
          <div className="demo-footer">展示資料 · 尚未連接後端</div>
        </div>
        <div className="panel actions-panel">
          <div className="panel-heading exe-panel-heading"><h2>快速操作</h2></div>
          <div className="actions-inner">
            <p>常用功能</p>
            <button className="button button-primary" onClick={onAdd}><Plus size={17}/>新增洗車紀錄</button>
            <button className="button button-secondary" onClick={() => onNavigate('customers')}>客戶與車輛</button>
            <button className="button button-secondary" onClick={() => onNavigate('settings')}>服務與項目</button>
            <span>快速進入常用管理頁面</span>
          </div>
        </div>
      </section>
      <div className="page-footnote">CarWash PWA <span>·</span> 介面設計預覽 · 使用示意資料</div>
    </div>
  );
}

function MetricCard({ label, value, note, tone }: { icon: LucideIcon; label: string; value: string; note: string; tone: string }) {
  return <div className={`metric-card ${tone}`}><span className="metric-accent" /><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></div>;
}

function Records({ records, search, setSearch, onAdd }: { records: typeof initialRecords; search: string; setSearch: (value: string) => void; onAdd: () => void }) {
  return <div className="page-content"><PageHeading eyebrow="服務管理" title="洗車紀錄" description="查詢每一筆服務、施作項目與付款資料。" action={<button className="button button-primary" onClick={onAdd}><Plus size={17} />新增紀錄</button>} />
    <div className="list-toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜尋車牌、客戶或紀錄編號" /></div><button className="button button-secondary filter-button" onClick={() => setSearch('')}><SlidersHorizontal size={16} />清除篩選</button><div className="result-count">共 {records.length} 筆</div></div>
    <div className="panel records-panel"><div className="table-scroll"><table><thead><tr><th>紀錄編號</th><th>客戶 / 車輛</th><th>施作項目</th><th>時間</th><th>付款方式</th><th className="align-right">金額</th><th>狀態</th><th /></tr></thead><tbody>{records.map((r) => <tr key={r.id}><td><span className="record-id">{r.id}</span></td><td><div className="table-person"><strong>{r.plate}</strong><span>{r.name} · {r.vehicle}</span></div></td><td>{r.service}</td><td>{r.time}</td><td>{r.payment}</td><td className="align-right amount-cell">{money(r.amount)}</td><td><span className="status-pill completed">{r.status}</span></td><td><button className="icon-button row-more" aria-label={`更多選項 ${r.id}`}><Ellipsis size={18} /></button></td></tr>)}</tbody></table></div>
      <div className="mobile-record-cards">{records.map((r) => <article className="mobile-record-card" key={r.id}><div className="mobile-record-top"><span className="record-id">{r.id}</span><span className="status-pill completed">{r.status}</span></div><div className="mobile-record-vehicle"><div className="record-car-icon"><CarFront size={20} /></div><div><strong>{r.plate}</strong><span>{r.name} · {r.vehicle}</span></div></div><div className="mobile-record-details"><span>{r.service}</span><span>{r.time} · {r.payment}</span><strong>{money(r.amount)}</strong></div></article>)}</div>
      {records.length === 0 && <div className="empty-state"><Search size={24} /><strong>找不到符合的紀錄</strong><span>請試試其他車牌、客戶名稱或編號。</span></div>}
      <div className="table-footer">顯示 {records.length} 筆示意紀錄 <span>資料尚未連接 Supabase</span></div>
    </div>
  </div>;
}

function Customers({ customers, search, setSearch, onNotify }: { customers: typeof customerRows; search: string; setSearch: (value: string) => void; onNotify: (message: string) => void }) {
  const [selectedPlate, setSelectedPlate] = useState<string | null>(customerRows[0].plate);
  const selected = customers.find((c) => c.plate === selectedPlate) ?? customers[0];
  return <div className="page-content exe-customers-page">
    <PageHeading title="客戶與車輛" description="管理客戶資料、車輛資訊與洗車紀錄" action={<button className="button button-primary" onClick={() => onNotify('目前為介面預覽，尚未開放新增客戶')}><Plus size={17}/>新增客戶</button>}/>
    <div className="customer-layout">
      <section className="panel exe-customer-directory">
        <div className="panel-heading exe-panel-heading"><h2>客戶資料</h2><span className="panel-count">{customers.length} 位</span></div>
        <div className="directory-search"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜尋客戶、電話或車牌"/></div>
        <div className="directory-list">
          {customers.map((c) => <button key={c.plate} className={`directory-item ${selected?.plate === c.plate ? 'selected' : ''}`} onClick={() => setSelectedPlate(c.plate)}>
            <span className="directory-item-copy"><strong>{c.name}</strong><small>{c.phone} · {c.plate}</small></span><ChevronRight size={17}/>
          </button>)}
          {customers.length===0 && <div className="empty-state"><Search size={21}/><strong>找不到客戶</strong></div>}
        </div>
      </section>
      <section className="panel exe-customer-details">
        <div className="panel-heading exe-panel-heading"><h2>客戶詳細資料</h2><button className="button button-secondary" onClick={()=>onNotify('預覽模式：客戶資料未連接資料庫')}>編輯資料</button></div>
        {selected ? <div className="customer-detail-body">
          <div className="detail-section-title">基本資料</div>
          <div className="detail-pairs"><div><span>客戶名稱</span><strong>{selected.name}</strong></div><div><span>聯絡電話</span><strong>{selected.phone}</strong></div><div><span>客戶備註</span><strong>無</strong></div><div><span>洗車次數</span><strong>{selected.visits} 次</strong></div></div>
          <div className="detail-section-heading"><span>名下車輛</span><button className="button button-secondary" onClick={()=>onNotify('預覽模式：尚未開放新增車輛')}><Plus size={16}/>新增車輛</button></div>
          <div className="vehicle-row"><div className="vehicle-icon"><CarFront size={21}/></div><div><strong>{selected.plate}</strong><small>{selected.car}</small></div><span className="status-pill neutral">車輛 1</span></div>
          <div className="customer-last">最近洗車：{selected.last}</div>
        </div> : <div className="empty-state"><Users size={23}/><strong>請選擇客戶</strong></div>}
      </section>
    </div>
  </div>;
}

function Maintenance({ onNotify }: { onNotify: (message: string) => void }) {
  const [filter, setFilter] = useState('全部');
  const [expanded, setExpanded] = useState<string | null>(maintenanceRows[0].plate);
  const rows = maintenanceRows.filter((r) => filter === '全部' || (filter === '已到期' ? r.tone === 'urgent' : filter === '即將到期' ? r.tone === 'soon' : r.tone === 'normal'));
  return <div className="page-content"><PageHeading eyebrow="車輛照護" title="定期維護" description="追蹤每輛車的保養週期與下次提醒。" action={<button className="button button-primary" onClick={() => onNotify('新增維護項目表單將於下一步實作')}><Plus size={17} />新增維護</button>} />
    <div className="maintenance-overview"><div className="maintenance-overview-icon"><Wrench size={21} /></div><div className="maintenance-overview-copy"><strong>有 3 項維護需要留意</strong><span>建議先處理已到期的維護項目。</span></div><div className="maintenance-overview-count">03</div></div>
    <div className="filter-chips">{['全部', '已到期', '即將到期', '尚未到期'].map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}{item === '全部' && <span>3</span>}</button>)}</div>
    <div className="maintenance-cards">{rows.map((r) => <article className={`panel maintenance-card ${expanded === r.plate ? 'expanded' : ''}`} key={r.plate}>
      <button className="maintenance-card-main" onClick={() => setExpanded(expanded === r.plate ? null : r.plate)}><div className={`maintenance-indicator ${r.tone}`}><Wrench size={18} /></div><div className="maintenance-card-title"><strong>{r.item}</strong><span>{r.plate} · {r.owner} · {r.car}</span></div><div className="maintenance-card-due"><span className={`due-tag ${r.tone}`}>{r.days}</span><ChevronDown size={17} className={expanded === r.plate ? 'rotated' : ''} /></div></button>
      {expanded === r.plate && <div className="maintenance-detail"><div className="maintenance-detail-grid"><div><span>預計維護日期</span><strong>{r.due}（示意）</strong></div><div><span>提醒設定</span><strong>提前 3 天</strong></div><div><span>維護週期</span><strong>每 3 個月</strong></div></div><div className="maintenance-note"><span>內部備註</span><p>確認車況後再安排服務，完成後更新下次維護日期。</p></div><div className="maintenance-actions"><button className="button button-secondary" onClick={() => onNotify('維護編輯功能將於下一步實作')}>編輯項目</button><button className="button button-primary" onClick={() => onNotify('預覽模式：尚未更新維護狀態')}><Check size={16} />標記完成</button></div></div>}
    </article>)}</div>
    <div className="page-footnote">內部備註僅供管理者查看；未來 LINE 提醒將與客戶綁定資料整合。</div>
  </div>;
}

type CatalogType = 'services' | 'addons' | 'maintenance';
type CatalogItem = { id: number; name: string; active: boolean };
const catalogDefaults: Record<CatalogType, CatalogItem[]> = {
  services: [{id:1,name:'標準洗車',active:true},{id:2,name:'精緻洗車',active:true},{id:3,name:'深層清潔',active:true}],
  addons: [{id:1,name:'內裝清潔',active:true},{id:2,name:'玻璃清潔',active:true},{id:3,name:'輪圈保養',active:true}],
  maintenance: [{id:1,name:'皮革保養',active:true},{id:2,name:'玻璃鍍膜檢查',active:true},{id:3,name:'內裝深層清潔',active:true}],
};
const catalogLabels: Record<CatalogType,string> = {services:'施作項目',addons:'附加項目',maintenance:'維護項目'};

function Settings({ onNotify }: { onNotify: (message: string) => void }) {
  const [tab,setTab] = useState<'general' | CatalogType | 'cloud'>('services');
  const [catalog,setCatalog] = useState<Record<CatalogType,CatalogItem[]>>(catalogDefaults);
  const [draft,setDraft] = useState('');
  const [editing,setEditing] = useState<number|null>(null);
  const [editName,setEditName] = useState('');
  const choose = (next: typeof tab) => {setTab(next);setDraft('');setEditing(null);};
  const changeItems = (fn:(items:CatalogItem[])=>CatalogItem[]) => {
    if(tab==='general'||tab==='cloud') return;
    setCatalog(prev=>({...prev,[tab]:fn(prev[tab])}));
  };
  const add = () => {
    if(tab==='general'||tab==='cloud')return;
    const name=draft.trim();
    if(!name)return;
    if(catalog[tab].some(x=>x.name.toLocaleLowerCase()===name.toLocaleLowerCase())){onNotify('此項目名稱已存在');return;}
    changeItems(items=>[...items,{id:Date.now(),name,active:true}]);
    setDraft('');onNotify('已新增至本次預覽（不會寫入資料庫）');
  };
  const saveEdit = (id:number) => {
    if(tab==='general'||tab==='cloud')return;
    const name=editName.trim();
    if(!name)return;
    if(catalog[tab].some(x=>x.id!==id&&x.name.toLocaleLowerCase()===name.toLocaleLowerCase())){onNotify('此項目名稱已存在');return;}
    changeItems(items=>items.map(x=>x.id===id?{...x,name}:x));
    setEditing(null);onNotify('已更新預覽項目');
  };
  return <div className="page-content"><PageHeading eyebrow="管理中心" title="服務與項目" description="管理施作項目、附加項目及維護項目。資料僅在本次預覽中生效。" />
    <div className="settings-layout">
      <div className="settings-menu panel">
        {([['services','施作項目',Droplets],['addons','附加項目',Sparkles],['maintenance','維護項目',Wrench],['general','一般設定',SlidersHorizontal],['cloud','雲端連線',Activity]] as const).map(([key,label,Icon])=><button key={key} className={`settings-menu-item ${tab===key?'selected':''}`} onClick={()=>choose(key)}><Icon size={18}/>{label}<ChevronRight size={16}/></button>)}
      </div>
      <div className="settings-content panel">
        {tab==='general' && <><div className="settings-section"><h2>系統資訊</h2><p>CarWash PWA 介面預覽版本。</p><div className="setting-row"><div><strong>應用程式</strong><span>CarWash 洗車管理</span></div><span className="status-pill neutral">UI Preview</span></div></div><div className="settings-section"><h2>操作偏好</h2><p>手機版提供底部導覽列，方便快速切換功能。</p></div></>}
        {tab==='cloud' && <div className="settings-section"><h2>雲端連線</h2><p>目前尚未連接 Supabase。</p><div className="connection-card"><div className="connection-icon"><Activity size={20}/></div><div><strong>Supabase 雲端資料庫</strong><span>本階段僅設計前端，不會傳送或儲存雲端資料。</span></div><span className="status-pill pending">未連線</span></div><div className="settings-hint"><CircleHelp size={16}/><span>未來連接時不會在前端使用 Service Role Key。</span></div></div>}
        {(tab==='services'||tab==='addons'||tab==='maintenance') && <div className="catalog-content">
          <div className="catalog-header"><div><h2>{catalogLabels[tab]}</h2><p>可新增、重新命名、啟用或停用項目。</p></div><span className="status-pill neutral">{catalog[tab].length} 項</span></div>
          <form className="catalog-add" onSubmit={e=>{e.preventDefault();add();}}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder={`輸入新的${catalogLabels[tab]}名稱`} aria-label={`新增${catalogLabels[tab]}`}/><button type="submit" className="button button-primary" disabled={!draft.trim()}><Plus size={17}/>新增項目</button></form>
          <div className="catalog-list">{catalog[tab].map(item=><div className="catalog-row" key={item.id}>
            {editing===item.id ? <form className="catalog-edit" onSubmit={e=>{e.preventDefault();saveEdit(item.id);}}><input value={editName} autoFocus onChange={e=>setEditName(e.target.value)} aria-label="編輯項目名稱"/><button type="submit" className="button button-primary" disabled={!editName.trim()}>儲存</button><button type="button" className="button button-secondary" onClick={()=>setEditing(null)}>取消</button></form> :
            <><div className="catalog-row-name"><strong>{item.name}</strong><span className={`status-pill ${item.active?'completed':'neutral'}`}>{item.active?'使用中':'已停用'}</span></div><div className="catalog-row-actions"><button className="button button-secondary" onClick={()=>{setEditing(item.id);setEditName(item.name);}}>編輯</button><button className="button button-secondary" onClick={()=>changeItems(items=>items.map(x=>x.id===item.id?{...x,active:!x.active}:x))}>{item.active?'停用':'啟用'}</button><button className="button button-secondary" onClick={()=>{if(window.confirm(`確定從預覽清單移除「${item.name}」？`))changeItems(items=>items.filter(x=>x.id!==item.id));}}>刪除</button></div></>}
          </div>)}</div>
          <div className="catalog-note">展示資料僅保留在目前開啟的頁面中，重新整理後會恢復預設項目。尚未連接資料庫。</div>
        </div>}
      </div>
    </div>
  </div>;
}

function AddRecordModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [plate, setPlate] = useState('');
  const [service, setService] = useState('精緻洗車');
  const [payment, setPayment] = useState('現金');
  const [amount, setAmount] = useState('600');
  const [note, setNote] = useState('');
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="record-modal" role="dialog" aria-modal="true" aria-labelledby="add-record-title">
    <div className="modal-heading"><div><span className="eyebrow">服務管理</span><h2 id="add-record-title">新增洗車紀錄</h2></div><button className="icon-button" onClick={onClose} aria-label="關閉"><X size={20} /></button></div>
    <div className="preview-notice"><Activity size={16} /><span>目前為介面預覽，儲存不會寫入資料庫。</span></div>
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}><label className="form-label">車牌號碼<input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} placeholder="例如 ABC-1234" required /></label><label className="form-label">施作項目<select value={service} onChange={(e) => { setService(e.target.value); setAmount(e.target.value === '精緻洗車' ? '600' : e.target.value === '標準洗車' ? '350' : '1200'); }}><option>精緻洗車</option><option>標準洗車</option><option>深層清潔</option></select></label><div className="form-two-cols"><label className="form-label">金額（NT$）<input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} required /></label><label className="form-label">付款方式<select value={payment} onChange={(e) => setPayment(e.target.value)}><option>現金</option><option>轉帳</option><option>LINE Pay</option><option>信用卡</option></select></label></div><label className="form-label">備註（選填）<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="輸入本次服務備註" rows={3} /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>取消</button><button type="submit" className="button button-primary"><Check size={17} />儲存紀錄</button></div></form>
  </section></div>;
}

export default App;
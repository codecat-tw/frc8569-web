export interface Activity {
  id: string;
  applyEmail: string;
  applyName: string;
  area: string;
  date: string;
  end: string;
  invite?: string[];
  members: Member[];
  name: string;
  remark: string;
  start: string;
  status: string;
  teacher: string;
}

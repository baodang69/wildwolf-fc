export interface Size {
  top: number;
  left: number;
}

export interface Detail {
  size: Size;
  position: string;
  memberId: string;
}

export interface Formation {
  status: boolean;
  _id: string;
  type: string;
  detail: Detail[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

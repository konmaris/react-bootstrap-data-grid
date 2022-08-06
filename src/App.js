import { useEffect, useState } from "react";

import axios from "axios";

const columns = [
  {
    key: "id",
    label: "ID",
    sortable: false,
    size: "280px",
  },
  {
    key: "order_no",
    label: "Order Number",
    sortable: false,
    size: "200px",
  },
  {
    key: "order_total",
    label: "Order Total",
    sortable: false,
    size: "130px",
  },
  {
    key: "customer",
    label: "Customer",
    sortable: false,
    size: "240px",
  },
  {
    key: "order_date",
    label: "Order Date",
    sortable: false,
    size: "170px",
  },
  {
    key: "store",
    label: "Store",
    sortable: false,
    size: "280px",
  },
  {
    key: "receipt",
    label: "Receipt",
    sortable: false,
    size: "100px",
  },
];

// const rows = [
//   {
//     id: 1,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 2,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 3,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 4,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 5,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 6,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 7,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 8,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 9,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
//   {
//     id: 10,
//     order_no: "ESP-000001",
//     order_total: 27.0,
//     customer: "45dsf324jh234qd3223d",
//     order_date: "27/08/2022 13:30",
//     store: "ESP-001",
//     receipt: "4543h5i44h32j4352k34",
//   },
// ];

function App() {
  const [rows, setRows] = useState([]);

  function TitleRow() {
    const cols = columns.map((col, idx) => {
      return (
        <div key={idx} style={{ fontWeight: 700, width: col.size }}>
          {col.label}
        </div>
      );
    });
    return <div className="d-flex">{cols}</div>;
  }

  function DataRows() {
    const _rows = rows.map((row, idx) => {
      const _rowKeys = Object.keys(row);

      let _colKeys = [];
      columns.forEach((col) => {
        _colKeys.push(col.key);
      });

      if (JSON.stringify(_colKeys) === JSON.stringify(_rowKeys)) {
        const cols = columns.map((col, jdx) => {
          if (_rowKeys.includes(col.key)) {
            return (
              <div key={jdx} style={{ width: col.size }}>
                {row[col.key]}
              </div>
            );
          }
          return <></>;
        });

        return (
          <div key={idx} style={{ display: "flex" }}>
            {cols}
          </div>
        );
      }
      return <></>;
    });
    return _rows;
  }

  useEffect(() => {
    axios.get("http://localhost:3010/orders").then((res) => {
      const { data } = res;
      let _rows = [];
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      data.forEach((x, idx) => {
        let dateCreated = new Date(x.createdAt);
        let dateString = dateCreated.toLocaleDateString("en-GB", options);

        _rows.push({
          id: x._id,
          order_no: `ESP-${String(idx).padStart(6, "0")}`,
          order_total: 27.0,
          customer: x.customer,
          order_date: dateString,
          store: x.store,
          receipt: x.receipt,
        });
      });
      setRows(_rows);
    });
  }, []);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-light" style={{ width: "80%", height: "70%" }}>
        <TitleRow />
        <DataRows />
      </div>
    </div>
  );
}

export default App;

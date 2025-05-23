import { SalesPersonListProps } from "@/lib/types/pjp";
import { Avatar, List } from "antd";

const salesPersons = [
  {
    name: "John Doe",
    avatar: "/logo.png",
    time: "25m ago",
    address: "75010 Port Qasim, karachi, Pakistan",
  },
  {
    name: "John Doe",
    avatar: "/logo.png",
    time: "25m ago",
    address: "87659 kalam , Sawat, Pakistan",
  },
  {
    name: "John Doe",
    avatar: "/logo.png",
    time: "25m ago",
    address: "123 Main St, City, Country",
  },
];

const SalesPersonList = ({ data }: SalesPersonListProps) => {
  return (
    <List
      className="bg-white rounded-lg p-4"
      header={<div className="text-lg font-semibold">Customers List</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="flex items-center gap-4">
          <img src="/logo.png" className="h-10 w-10" />

          <div className="w-full">
            <div className="font-bold">
              {item.salesPerson.firstName} {item.salesPerson.lastName}
            </div>
            <div className="text-gray-500">{item.customer.name}</div>
            {/* <div className="text-sm text-gray-400">
                Lat: {item.customer.latitude}, Long: {item.customer.longitude}
              </div> */}
          </div>
        </List.Item>
      )}
    />
  );
};
export default SalesPersonList;

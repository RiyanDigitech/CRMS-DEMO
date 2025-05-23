
import SalesActivityTable from "@/components/modules/sales-activity/sales-activity-table";
import SalesActivityService from "@/services/sales-activity/sales-activity.service";
import { SalesActivityHeatmap } from "@/components/modules/sales-activity/sales-activity-heatmap";
import { SalesActivityChart } from "@/components/modules/sales-activity/sales-activity-chart";


const SalesActivityListPage = () => {
  const { useFetchSalesActivity } = SalesActivityService();
  const { data: salesActivityData, isLoading: isSalesActivityDataLoading } =
    useFetchSalesActivity(10, 1);

  return (
    <main className="px-8">
      <div className="container mx-auto py-8">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalesActivityHeatmap />
          <SalesActivityChart />
        </div>
      </div>

      <div className=" mt-4  py-[18px] w-full bg-white rounded-lg ">
        <div className="flex justify-between items-center px-4 mb-6 md:px-6 lg:px-8">
          <div className="w-full max-w-[400px] sm:w-2/3 lg:w-3/4 ">
            <p className="text-2xl font-semibold"> Sales  Activities</p>
          </div>

        </div>


        <div className="px-2 md:px-6">
          <SalesActivityTable
            isLoading={isSalesActivityDataLoading}
            data={salesActivityData?.data}
          />
        </div>
      </div>
    </main>
  );
};
export default SalesActivityListPage;

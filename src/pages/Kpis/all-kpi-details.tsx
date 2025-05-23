import { Table, Spin, Pagination } from "antd";
import { useEffect, useState } from "react";
import "../../index.css";
import KpiService from "@/services/kpi/kpi.service";
import { KpiApiResponse } from "@/lib/types/kpi";
import AllTeamMembersKpiDetailsColumns from "@/lib/constants/columns/all-members-kpi";
import { Filter } from "@/components/iconComponents";
import AllKpiCreateModal from "@/components/kpi/kpi-all-modal";
// 🔄 Transform multiple KPI items into multiple rows
const transformKpiData = (kpis: any): any => {
  const transformedData: any = [];

  kpis?.forEach((kpi) => {
    const groupedItems: Record<string, any[]> = {};

    kpi.kpiItems.forEach((item) => {
      groupedItems[item.kpiName] = groupedItems[item.kpiName] || [];
      groupedItems[item.kpiName].push(item);
    });

    const maxLength = Math.max(
      ...Object.values(groupedItems).map((v) => v.length)
    );

    for (let i = 0; i < maxLength; i++) {
      const newKpi: any = { ...kpi, kpiItems: [] };

      for (const kpiName in groupedItems) {
        if (groupedItems[kpiName][i]) {
          newKpi.kpiItems.push(groupedItems[kpiName][i]);
        }
      }

      newKpi.key = `${kpi.id}-${i}`;
      transformedData.push(newKpi);
    }
  });

  return transformedData;
};

// 📌 Extract unique KPI names
const extractUniqueKpiNames = (kpis: any[]): string[] => {
  const names = new Set<string>();
  kpis?.forEach((kpi) =>
    kpi.kpiItems?.forEach((item: any) => names.add(item.kpiName))
  );
  return [...names];
};

export default function AllKpiDetails() {
  const { useFetchAllDetailsKpis } = KpiService();
  const { data: apiData, isFetching } = useFetchAllDetailsKpis();
  const [groupedData, setGroupedData] = useState<Record<string, any>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const data = apiData?.data;

    if (!data) return;

    const grouped = data.reduce((acc: any, team: any) => {
      const manager = team.reportingManager;
      const key = manager
        ? `${manager.id}-${manager.firstName}-${manager.lastName}`
        : "No Manager";

      if (!acc[key]) {
        acc[key] = { manager, teams: [] };
      }

      acc[key].teams.push(team);
      return acc;
    }, {});

    setGroupedData(grouped);
  }, [apiData]);

  const renderSummaryRow = (totals: any, managerName: string) => (
    <Table.Summary.Row style={{ fontWeight: "bold" }}>
      <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={1}>{managerName}</Table.Summary.Cell>
      <Table.Summary.Cell index={2}>40%</Table.Summary.Cell>
      <Table.Summary.Cell index={3} align="center">
        {totals.salesTradeTarget}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4} align="center">
        {totals.salesTradeActual}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} align="center">
        {totals.salesTradeScore.toFixed(2)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={6}>45%</Table.Summary.Cell>
      <Table.Summary.Cell index={7} align="center">
        {totals.dsoTarget}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={8} align="center">
        {totals.dsoActual}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9} align="center">
        {totals.dsoScore.toFixed(2)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>15%</Table.Summary.Cell>
      <Table.Summary.Cell index={11} align="center">
        {totals.activeDealerTarget}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={12} align="center">
        {totals.activeDealerActual}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={13} align="center">
        {totals.activeDealerScore.toFixed(2)}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );

  const ShowFilterModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {" "}
      {<AllKpiCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />}
      <div className="flex justify-end">
        {" "}
        <button
          onClick={() => ShowFilterModal()}
          className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
        >
          <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
            <Filter />{" "}
          </div>
          <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
        </button>
      </div>
      <div className="p-4">
        {isFetching ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin />
          </div>
        ) : (
          Object.entries(groupedData).map(([managerKey, group]: any) => {
            const { manager, teams } = group;
            const managerName = manager
              ? `${manager.firstName} ${manager.lastName}`
              : "No Reporting Manager";

            return (
              <div key={managerKey} className="mb-10">
                <h2 className="text-lg font-semibold mb-4">
                  Reporting Manager: {managerName}
                </h2>

                {teams.map((team: any, index: number) => {
                  const kpis = team.kpis || [];
                  const transformedData = transformKpiData(kpis);
                  const extractedKpiNames = extractUniqueKpiNames(kpis);

                  const totals = {
                    dsoActual: team?.dsoActual ?? 0,
                    dsoTarget: team?.dsoTarget ?? 0,
                    dsoScore: team?.dsoScore ?? 0,
                    activeDealerActual: team?.activeDealerActual ?? 0,
                    activeDealerTarget: team?.activeDealerTarget ?? 0,
                    activeDealerScore: team?.activeDealerScore ?? 0,
                    salesTradeActual: team?.salesTradeActual ?? 0,
                    salesTradeTarget: team?.salesTradeTarget ?? 0,
                    salesTradeScore: team?.salesTradeScore ?? 0,
                  };

                  return (
                    <div key={`${managerKey}-${index}`} className="mb-6">
                      <h3 className="text-md font-medium mb-2">
                        Team: {team?.teamName} (Members: {team?.memberCount})
                      </h3>

                      <div className="border rounded-lg p-3 mb-4 bg-gray-50">
                        <label className="text-sm text-gray-600 font-medium block mb-1">
                          Cumulative KPI Rating
                        </label>
                        <div className="h-9 bg-white border px-3 flex items-center">
                          {team.cumulativeKpiRating || "-"}
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-auto">
                        <Table<KpiApiResponse>
                          columns={AllTeamMembersKpiDetailsColumns({
                            datas: team,
                            kpiNames: extractedKpiNames,
                          })}
                          dataSource={transformedData}
                          pagination={false}
                          summary={() => renderSummaryRow(totals, managerName)}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between items-center mt-6 border-t pt-4 flex-col md:flex-row gap-3">
                  <div className="text-sm text-gray-600">
                    Showing 10 of {teams.length} Results
                    <button
                      onClick={() => console.log("View All")}
                      className="ml-2 text-[#008444] font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <Pagination
                    current={1}
                    pageSize={10}
                    total={teams.length}
                    onChange={(page) => console.log(page)}
                    showSizeChanger={false}
                    size="small"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

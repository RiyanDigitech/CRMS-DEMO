import { ComplaintCharts } from "@/components/modules/complaints/complaint-chart";
import ComplaintTable from "@/components/modules/complaints/complaint-table";
import CreateComplaintModal from "@/components/modules/complaints/create-complaint-modal";
import { ComplaintDetailsModal } from "@/components/modules/complaints/detail-complaint-modal";
import { UpdateComplaintModal } from "@/components/modules/complaints/update-complaint-modal";
import ComplaintService from "@/services/complaints.service";
import { useState } from "react";

const ComplaintListPage = () => {
  const { useFetchAllComplaints, useHandleUpdateComplaintAdmin } =
    ComplaintService();
  const { data: complaintData, isLoading: isComplaintDataLoading } =
    useFetchAllComplaints();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(
    null
  );

  const { mutate: handleUpdateComplaintAdmin, isPending } =
    useHandleUpdateComplaintAdmin(selectedComplaintId);

  const handleUpdateComplaint = (complaintId: number) => {
    setSelectedComplaintId(complaintId);
    setIsUpdateModalOpen(true);
  };

  const handleViewComplaint = (complaintId: number) => {
    setSelectedComplaintId(complaintId);
    setIsDetailsModalOpen(true);
  };

  return (
    <main className="px-8">
      <ComplaintCharts />
      <div className=" mt-4  py-[18px] w-full bg-white rounded-lg ">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:justify-between px-[11px] md:px-[20px]  ">
          <div className="flex flex-col  md:px-3">
            <h2 className="font-[700]  text-[#323C47]  text-lg md:text-xl">
              All Support Tickets
            </h2>
            <p className="text-[#A9B9C6] text-sm md:text-[15px] font-[400]">
              List of ticket opened by Customer
            </p>
          </div>
          <div className="flex w-[60%] justify-end gap-2 items-center">
            {/* <CreateComplaintModal /> */}
            {/* <Button
              className="hidden md:flex items-center border-[2px]  w-[115px] h-[50px] border-[#edf2ef] rounded-lg md:px-3 md:py-2 bg-[#fafafa] text-[#6B6B6B] font-medium"
              icon={
                <svg
                  width="23"
                  height="17"
                  viewBox="0 0 23 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0234 0.375C21.832 0.375 22.5 1.04297 22.5 1.85156C22.5 2.20312 22.3594 2.51953 22.1836 2.76562L17.4375 8.84766V13.875C17.4375 14.8242 16.3477 15.3516 15.6094 14.7539L12.3398 12.1875C11.9883 11.9414 11.8125 11.5195 11.8125 11.0977V8.84766L7.03125 2.76562C6.85547 2.51953 6.75 2.20312 6.75 1.85156C6.75 1.04297 7.38281 0.375 8.19141 0.375H21.0234ZM13.5 8.53125V10.957L15.75 12.7148V8.53125C15.75 8.35547 15.7852 8.17969 15.9258 8.03906L20.5664 2.0625H8.64844L13.2891 8.03906C13.4297 8.17969 13.5 8.35547 13.5 8.53125ZM6.15234 3.46875L6.82031 4.3125H1.89844L6.53906 10.2891C6.67969 10.4297 6.75 10.6055 6.75 10.7812V12.082L9 13.8398V10.7812C9 10.6055 9.03516 10.4297 9.17578 10.2891L10.3359 8.77734L10.6875 9.23438V15C10.6875 15.9492 9.59766 16.4766 8.85938 15.8789L5.58984 13.3125C5.23828 13.0664 5.0625 12.6445 5.0625 12.2227V11.0977L0.28125 5.01562C0.105469 4.76953 0 4.45312 0 4.10156C0 3.29297 0.632812 2.625 1.44141 2.625H5.73047C5.83594 2.94141 5.97656 3.22266 6.15234 3.46875Z"
                    fill="#6B6B6B"
                  />
                </svg>
              }
            >
              Filters
            </Button> */}
          </div>
        </div>
        <hr className=" my-[18px] bg-[#EBF0ED]  hidden md:block" />
        <div className="mt-5 px-2 md:px-6">
          <ComplaintTable
            isLoading={isComplaintDataLoading}
            data={complaintData?.data}
            onEdit={handleUpdateComplaint}
            onView={handleViewComplaint}
          />
        </div>
      </div>
      <UpdateComplaintModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedComplaintId(null);
        }}
        onSubmit={(values) => {
          handleUpdateComplaintAdmin(values, {
            onSuccess: () => {
              setIsUpdateModalOpen(false);
              setSelectedComplaintId(null);
              // Refetch data after update
              useFetchAllComplaints().refetch();
            },
          });
        }}
        defaultValues={complaintData?.data?.find(
          (c) => c.id === selectedComplaintId
        )}
        isLoading={isPending}
        complaintId={selectedComplaintId}
      />
      <ComplaintDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedComplaintId(null);
        }}
        complaintData={
          complaintData?.data?.find((c) => c.id === selectedComplaintId) || {}
        }
        onUpdateSubmit={(values) => {
          handleUpdateComplaintAdmin(values, {
            onSuccess: () => {
              setIsDetailsModalOpen(false);
              setSelectedComplaintId(null);
              // Refetch data after update
              useFetchAllComplaints().refetch();
            },
          });
        }}
        isUpdating={isPending}
      />
    </main>
  );
};
export default ComplaintListPage;

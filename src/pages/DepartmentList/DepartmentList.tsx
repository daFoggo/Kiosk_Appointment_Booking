import { motion } from "framer-motion";

import PageHeading from "@/components/PageHeading/PageHeading";
import SearchButton from "@/components/SearchButton/SearchButton";
import DepartmentCard from "@/components/DepartmentCard/DepartmentCard";

import { departmentList } from "./constant";
import { containerVariants, itemVariants } from "./motion";

const DepartmentList = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 rounded-xl p-2 sm:p-4 border">
      <PageHeading
        title="Danh sách phòng ban"
        description="Lựa chọn danh sách phòng ban mà bạn muốn liên hệ"
        actionButton={<SearchButton className="font-semibold font-inter" />}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 b"
      >
        {departmentList.map((department) => (
          <motion.div
            key={department.id}
            variants={itemVariants}
            className="h-full"
          >
            <DepartmentCard {...department} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DepartmentList;

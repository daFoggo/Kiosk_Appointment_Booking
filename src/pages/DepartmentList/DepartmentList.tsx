import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";
import SearchButton from "@/components/SearchButton/SearchButton";
import DepartmentCard from "@/components/DepartmentCard/DepartmentCard";
import { departmentList } from "./constant";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const DepartmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState(departmentList);

  // Filter departments based on search term
  useEffect(() => {
    const filtered = departmentList.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 rounded-xl p-2 sm:p-4 border">
      <PageHeading
        title="Danh sách phòng ban"
        description="Lựa chọn danh sách phòng ban mà bạn muốn liên hệ"
        actionButton={
          <SearchButton 
            className="font-semibold font-inter" 
            onSearch={handleSearch}
            placeholder="Tìm kiếm phòng ban..."
          />
        }
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {filteredDepartments.map((department) => (
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
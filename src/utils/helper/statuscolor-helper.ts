export const getStatusColor = (status: string): string => {
  switch (status) {
    case "running":
      return "bg-green-500"; // Tailwind CSS class for green background
    case "stopped":
      return "bg-red-500"; // Tailwind CSS class for red background
    case "terminated":
      return "bg-gray-500"; // Tailwind CSS class for gray background
    case "provisioning":
      return "bg-orange-500"; // Tailwind CSS class for orange background
    default:
      return "bg-black"; // Fallback color
  }
};

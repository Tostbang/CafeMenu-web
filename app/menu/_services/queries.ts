import { useQueryOP } from "@/lib/Fetch";

expovim.keymap.set("n", "<leader>pv", "<cmd>Neotree toggle reveal<CR>", { desc = "Toggle Neo-tree & Reveal File" })rt function useGetMenuById() {
  return useQueryOP("get", "/api/PublicMenu/{menuId}", {
    params: {
      path: { menuId: 2 },
    },
  });
}

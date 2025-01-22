import AuthPage from "./auth/page";
import CreatePost from "@/components/post";
import PostViewPage from "./post_view";
import { CategoriesCRUD } from "@/components/category";
import CardListPage from "./card_view";

export default function Home() {
  return (
    <div>
      {/* <AuthPage /> */}
      {/* <CreatePost /> */}
      {/* <PostViewPage /> */}
      <CardListPage/>
    </div>
  );
}

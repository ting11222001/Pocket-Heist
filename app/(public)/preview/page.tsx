// preview page for newly created UI components
import Skeleton from "@/components/Skeleton"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>
      <div className="skeleton-grid">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}

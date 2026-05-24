// preview page for newly created UI components
import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

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

      <h3>Avatar</h3>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Avatar name="Alice" />
        <Avatar name="PocketHeist" />
        <Avatar name="AliceSmithJones" />
      </div>
    </div>
  )
}

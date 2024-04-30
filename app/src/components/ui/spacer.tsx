export const Spacer = ({ w = 1, h = 1 }: { w?: number; h?: number }) => {
  return (
    <div
      style={{
        flexGrow: 0,
        flexShrink: 0,
        width: w,
        height: h,
      }}
    />
  )
}

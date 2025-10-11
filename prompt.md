Console Error

A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

See more info here: https://nextjs.org/docs/messages/react-hydration-error


  ...
    <SegmentViewNode type="page" pagePath="(home)/pag...">
      <SegmentTrieNode>
      <ClientPageRoot Component={function HomePage} searchParams={{}} params={{}}>
        <HomePage params={Promise} searchParams={Promise}>
          <main className="flex flex-col">
            <HeroSection>
            <section className="py-16 sm:p...">
              <div className="mx-auto ma...">
                <div className="grid grid-...">
                  <div>
                  <div className="flex items...">
                    <div className="relative f...">
                      <IconCloud iconSlugs={[...]}>
                        <Cloud1 containerProps={{style:{...}}} options={{reverse:true, ...}}>
                          <CloudWrapped containerProps={{style:{...}}} options={{reverse:true, ...}}>
                            <UseInViewport1 cb={function onVisibilityChange}>
                              <div ref={{current:null}}>
                                <div
+                                 id="canvas-container-e95a9ae9-e38f-065c-8c87-19f87e71c521"
-                                 id="canvas-container-fe916411-dc5c-050b-e94b-daa554387fb3"
                                  style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",paddingTop:40}}
                                >
                                  <canvas
+                                   id="canvas-e95a9ae9-e38f-065c-8c87-19f87e71c521"
-                                   id="canvas-fe916411-dc5c-050b-e94b-daa554387fb3"
                                    style={{width:"100%",maxWidth:"70vh"}}
                                    width={1000}
                                    height={1000}
                                  >
            ...
              <motion.div initial={{filter:"bl...", ...}} whileInView={{filter:"bl...", ...}} viewport={{once:true}} ...>
                <div className="grid grid-..." style={{filter:"bl...", ...}} ref={function useMotionRef.useCallback}>
                  <FeatureCard feature={{title:"Com...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={140}
+                                 y={40}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
+                                 y={100}
-                                 y="120"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={180}
-                                 x="160"
+                                 y={120}
-                                 y="80"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={200}
+                                 y={60}
-                                 y="80"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={200}
+                                 y={20}
-                                 y="120"
                                >
                      ...
                  <FeatureCard feature={{title:"AI-...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={160}
+                                 y={100}
-                                 y="20"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={200}
-                                 x="140"
+                                 y={40}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
+                                 y={80}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={160}
-                                 x="180"
+                                 y={20}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
                                  y={120}
                                >
                      ...
                  <FeatureCard feature={{title:"Sma...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={160}
-                                 x="200"
+                                 y={120}
-                                 y="40"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={140}
+                                 y={80}
-                                 y="40"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={200}
+                                 y={20}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
                                  y={60}
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={180}
-                                 x="200"
+                                 y={120}
-                                 y="20"
                                >
                      ...
                  <FeatureCard feature={{title:"Rea...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="200"
+                                 y={20}
-                                 y="120"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
+                                 y={120}
-                                 y="100"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={200}
-                                 x="180"
+                                 y={20}
-                                 y="120"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={180}
-                                 x="160"
+                                 y={80}
-                                 y="20"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={140}
+                                 y={120}
-                                 y="80"
                                >
                      ...
                  <FeatureCard feature={{title:"Dyn...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
+                                 y={20}
-                                 y="40"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={200}
+                                 y={120}
-                                 y="80"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={140}
+                                 y={20}
-                                 y="60"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="180"
+                                 y={60}
-                                 y="120"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={180}
-                                 x="200"
+                                 y={40}
-                                 y="20"
                                >
                      ...
                  <FeatureCard feature={{title:"Mul...", ...}}>
                    <div className="relative o...">
                      <div className="pointer-ev...">
                        <div className="from-foreg...">
                          <GridPattern width={20} height={20} x="-12" y="4" squares={[...]} className="fill-foreg...">
                            <svg aria-hidden="true" className="fill-foreg...">
                              <defs>
                              <rect>
                              <svg x="-12" y="4" className="overflow-v...">
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
                                  x={160}
+                                 y={120}
-                                 y="20"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={160}
-                                 x="200"
+                                 y={100}
-                                 y="20"
                                >
                                <rect>
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="160"
+                                 y={60}
-                                 y="120"
                                >
                                <rect
                                  strokeWidth="0"
                                  width={21}
                                  height={21}
+                                 x={140}
-                                 x="180"
+                                 y={120}
-                                 y="80"
                                >
                      ...
            ...
    ...
components/ui/interactive-icon-cloud.tsx (84:5) @ IconCloud


  82 |   return (
  83 |     // @ts-ignore
> 84 |     <Cloud {...cloudProps}>
     |     ^
  85 |       <>{renderedIcons}</>
  86 |     </Cloud>
  87 |   )
Call Stack
22

Show 19 ignore-listed frame(s)
canvas
<anonymous>
IconCloud
components/ui/interactive-icon-cloud.tsx (84:5)
HomePage
app/(home)/page.tsx (315:17)
1
2

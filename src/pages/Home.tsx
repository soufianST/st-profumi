--- /tmp/st-profumi-main/src/pages/Home.tsx	2026-06-12 21:17:46.000000000 +0000
+++ st-profumi-main/src/pages/Home.tsx	2026-06-14 08:53:50.651713739 +0000
@@ -2019,7 +2019,7 @@
         transition: "all 0.3s",
         display: "flex",
         flexDirection: "column",
-        alignSelf: "start",
+        height: "100%",
       }}
       onMouseEnter={(e) => {
         e.currentTarget.style.border = "1px solid #c9a96e33";
@@ -3118,13 +3118,9 @@
                   </div>
                 </div>
               </div>
-              <div style={{ display: "flex", gap: isMobile ? 10 : isTablet ? 16 : 20, alignItems: "flex-start" }}>
-                {Array.from({ length: cols }).map((_, colIndex) => (
-                  <div key={colIndex} style={{ flex: 1, display: "flex", flexDirection: "column", gap: isMobile ? 10 : isTablet ? 16 : 20 }}>
-                    {filtered.filter((_, i) => i % cols === colIndex).map((f) => (
-                      <FragranceCard key={f.id} frag={f} onAdd={addToCart} cart={cart} cols={cols} lang={lang} />
-                    ))}
-                  </div>
+              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 10 : isTablet ? 16 : 20, alignItems: "stretch" }}>
+                {filtered.map((f) => (
+                  <FragranceCard key={f.id} frag={f} onAdd={addToCart} cart={cart} cols={cols} lang={lang} />
                 ))}
               </div>
             </>

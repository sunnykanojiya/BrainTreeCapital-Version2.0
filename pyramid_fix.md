# Pyramid Shape Fix Plan

## Current issue

The pyramid is built from four independently sized SVG-backed segments rather than one shared silhouette. Their widths are configured separately in `src/App.jsx`:

- Desktop: 56%, 72%, 88%, and 100%.
- Mobile: 80%, 86%, 93%, and 100%.

Each segment also has its own insets and bevel geometry. The top Conviction layer uses a different polygon shape, and each SVG is stretched to fill its segment. Because the top layer is much taller than the lower layers—and their heights change again at the mobile breakpoint—the edges do not maintain a consistent slope. Small gaps between the segments and their separate bevels make the overall outline look stepped and disconnected.

## Proposed fix

1. Define one responsive triangular silhouette in a normalized SVG coordinate system.
2. Draw the four layer faces as contiguous bands within that silhouette. Derive their boundaries from the same left and right slopes instead of assigning independent widths.
3. Align the side facets and bevels to the shared outer edges. Keep only a consistent, thin separator between layers.
4. Preserve the existing text, icons, colors, arrows, and animation. Keep the text as responsive overlays and ensure each layer has enough interior space for its copy.
5. Verify the pyramid at mobile and desktop sizes, checking that the outer edges form one triangle, the content is readable, and reduced-motion behavior remains intact.

## Scope

This plan addresses the pyramid geometry and presentation only. It does not change the layer copy, section heading, supporting text, arrows, or surrounding sections. No implementation changes are included yet.

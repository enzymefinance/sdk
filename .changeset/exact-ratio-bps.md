---
"@enzymefinance/sdk": patch
---

Fixed `convertFromRatioToBps` dropping a basis point for ratios whose floating-point product lands just under an integer (for example 0.0003 gave 2 bps instead of 3).

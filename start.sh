#!/bin/bash
echo "=========================================="
echo "  CC Analyser - MERN Stack Setup"
echo "=========================================="
echo ""
echo "Step 1: Installing dependencies..."
npm run install-all
echo ""
echo "Step 2: Starting development servers..."
echo "Backend  → http://localhost:5000"
echo "Frontend → http://localhost:3000"
echo ""
npm run dev

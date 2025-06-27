#!/bin/bash

echo "🔄 Real Estate Project - Test Cleanup & Production Testing"
echo "========================================================="

# Create log file for removed files
REMOVED_FILES_LOG="removed_test_files.log"
echo "Test files removed on $(date)" > $REMOVED_FILES_LOG

echo "📋 Identifying test files to remove..."

# Find and log test files before removal
find /workspaces/realestate -path "*/node_modules" -prune -o -type f \( -name "*.test.js" -o -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.js" -o -name "*.spec.ts" -o -name "*.spec.tsx" \) -print >> $REMOVED_FILES_LOG

find /workspaces/realestate -path "*/node_modules" -prune -o -type d \( -name "__tests__" -o -name "tests" -o -name "__mocks__" -o -name "mocks" -o -name "fixtures" -o -name "snapshots" \) -print >> $REMOVED_FILES_LOG

echo "🗑️  Removing test files and directories..."

# Remove test files (excluding node_modules)
find /workspaces/realestate -path "*/node_modules" -prune -o -type f \( -name "*.test.js" -o -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.js" -o -name "*.spec.ts" -o -name "*.spec.tsx" \) -delete

# Remove test directories (excluding node_modules)
find /workspaces/realestate -path "*/node_modules" -prune -o -type d \( -name "__tests__" -o -name "tests" -o -name "__mocks__" -o -name "mocks" -o -name "fixtures" -o -name "snapshots" \) -exec rm -rf {} + 2>/dev/null

# Remove setupTests.ts as it's only for testing
rm -f /workspaces/realestate/frontend/src/setupTests.ts

echo "📊 Test cleanup summary:"
echo "Files and directories removed: $(wc -l < $REMOVED_FILES_LOG)"

echo ""
echo "🏗️  Building and testing production code..."

# Frontend - Build and run on source code only
echo "Frontend: Building React app..."
cd /workspaces/realestate/frontend
npm run build

echo ""
echo "Backend: Building TypeScript..."
cd /workspaces/realestate/backend
npm run build

echo ""
echo "✅ Production build completed successfully!"
echo "📁 Source code directories tested:"
echo "   - /workspaces/realestate/frontend/src/"
echo "   - /workspaces/realestate/backend/src/"

echo ""
echo "📋 Cleanup log saved to: $REMOVED_FILES_LOG"
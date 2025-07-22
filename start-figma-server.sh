#!/bin/bash

echo "🚀 Starting MindBuddy Figma Import Server..."
echo ""
echo "📁 Serving files from: html-snippets/"
echo "🌐 Access at: http://localhost:8080"
echo ""
echo "📋 Quick links:"
echo "   - Index: http://localhost:8080/index.html"
echo "   - Dashboard: http://localhost:8080/dashboard/dashboard.html"
echo "   - Login: http://localhost:8080/authentication/login.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd html-snippets && python3 -m http.server 8080
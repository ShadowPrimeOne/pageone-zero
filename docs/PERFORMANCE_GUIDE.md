# Performance Monitoring Guide

This guide explains how to use the performance monitoring system to track and compare page performance during optimizations.

## Overview

The performance monitoring system consists of three main components:

1. **PerformanceDashboard** - Detailed performance metrics and analysis
2. **PerformanceSummary** - Quick overview with grade and key metrics
3. **PerformanceTracker** - Save snapshots and compare performance over time

## Components

### PerformanceDashboard (Top Right)
- **Location**: Fixed position, top-right corner
- **Purpose**: Detailed performance analysis with Google Ads standards
- **Features**:
  - Core Web Vitals (LCP, FID, CLS, TTFB)
  - Overall performance score
  - Resource metrics (size, images, scripts)
  - Priority actions and recommendations
  - Impact assessment for Google Ads

### PerformanceSummary (Bottom Left)
- **Location**: Fixed position, bottom-left corner
- **Purpose**: Quick performance overview
- **Features**:
  - Overall grade (A-F)
  - Key metrics with status indicators
  - Top priority action
  - Compact design for quick reference

### PerformanceTracker (Top Left)
- **Location**: Fixed position, top-left corner
- **Purpose**: Track performance changes over time
- **Features**:
  - Save performance snapshots with descriptions
  - Compare snapshots to measure improvements
  - View historical performance data
  - Generate comparison reports

## How to Use

### 1. Initial Performance Assessment

1. Load your page and wait for it to fully load
2. Check the **PerformanceSummary** for the overall grade
3. Review the **PerformanceDashboard** for detailed metrics
4. Note any "poor" or "needs-improvement" statuses

### 2. Save Baseline Snapshot

1. Open the **PerformanceTracker**
2. Add a description like "Baseline - Before optimizations"
3. Click "Save Current Performance"
4. This creates your baseline for comparison

### 3. Make Optimizations

Implement performance improvements such as:
- Image optimization
- Code splitting
- Lazy loading
- CSS/JS minification
- Server optimizations

### 4. Measure Improvements

1. After each optimization, refresh the page
2. Wait for the page to fully load
3. Save a new snapshot with a descriptive name
4. Use the "Compare with previous" feature to see changes

### 5. Analyze Results

The comparison will show:
- **Improvements**: Metrics that got better
- **Regressions**: Metrics that got worse
- **Unchanged**: Metrics that stayed the same
- **Percentage changes** for each metric

## Key Metrics Explained

### Core Web Vitals

- **LCP (Largest Contentful Paint)**
  - Target: < 2.5s
  - Measures perceived loading speed
  - Most important for user experience

- **FID (First Input Delay)**
  - Target: < 100ms
  - Measures interactivity
  - Requires user interaction to capture

- **CLS (Cumulative Layout Shift)**
  - Target: < 0.1
  - Measures visual stability
  - May require scrolling to capture

- **TTFB (Time to First Byte)**
  - Target: < 800ms
  - Measures server response time
  - Always available

### Overall Score

- **A (90-100)**: Excellent performance
- **B (80-89)**: Good performance
- **C (70-79)**: Needs improvement
- **D (60-69)**: Poor performance
- **F (0-59)**: Very poor performance

## Best Practices

### 1. Consistent Testing
- Test on the same device/browser
- Use the same network conditions
- Test at similar times of day

### 2. Meaningful Snapshots
- Use descriptive names for snapshots
- Include what changes were made
- Example: "After image optimization - reduced from 15 to 8 images"

### 3. Multiple Measurements
- Take multiple snapshots for each optimization
- Average the results for more accuracy
- Account for natural variation

### 4. Focus on Impact
- Prioritize improvements to "poor" metrics
- LCP and FID have the biggest impact on user experience
- Small improvements in multiple areas add up

## Troubleshooting

### Metrics Not Available
- **LCP/CLS**: Refresh page and wait for full load
- **FID**: Interact with the page (click, scroll, type)
- **TTFB**: Should always be available

### Inconsistent Results
- Clear browser cache between tests
- Use incognito/private browsing
- Disable browser extensions
- Test on different devices

### Performance Dashboard Not Showing
- Ensure you're in development mode
- Check browser console for errors
- Verify the component is imported correctly

## Google Ads Impact

The system evaluates performance against Google Ads standards:

- **Good**: Meets standards, excellent for ad performance
- **Needs Improvement**: Moderate impact on ad performance
- **Poor**: High impact on ad performance and Quality Score

## Example Workflow

1. **Baseline**: Save snapshot "Original page"
2. **Optimization 1**: Optimize images → Save "After image optimization"
3. **Compare**: See 15% improvement in LCP
4. **Optimization 2**: Implement lazy loading → Save "After lazy loading"
5. **Compare**: See additional 10% improvement
6. **Final**: Overall score improved from C to A

## Data Storage

- Snapshots are stored in browser localStorage
- Data persists between sessions
- Maximum 10 snapshots stored
- Clear data using "Clear All" button

## Next Steps

1. Start with a baseline measurement
2. Identify the biggest performance issues
3. Implement optimizations one at a time
4. Measure and compare after each change
5. Document your improvements
6. Share results with your team

This system will help you make data-driven decisions about performance optimizations and track your progress over time. 
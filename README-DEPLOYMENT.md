# Vercel Deployment - Adwords Landing Page Test

This deployment is configured to only expose the Adwords landing page for testing purposes.

## Configuration

- **Target Page**: `/page/adwords-boost-au-electrician`
- **All Routes Redirect**: All traffic is redirected to the target page
- **Framework**: Next.js 15
- **Build Command**: `npm run build`

## Features Being Tested

- ✅ Modern 2025 booking form with horizontal date grid
- ✅ Mobile-responsive design
- ✅ Scarcity and urgency triggers
- ✅ Testimonial popup system
- ✅ Animated elements and interactions
- ✅ Trust badges and social proof

## Deployment Commands

```bash
# Deploy to Vercel
vercel --prod

# Deploy preview (staging)
vercel

# View deployment status
vercel ls
```

## Environment Variables

Make sure to set up any required environment variables in Vercel dashboard:
- API keys
- Database connections
- External service configurations

## Testing Checklist

- [ ] Mobile responsiveness
- [ ] Form submission
- [ ] Date selection
- [ ] Animations
- [ ] Loading states
- [ ] Error handling
- [ ] Performance metrics 
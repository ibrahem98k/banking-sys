# Frontend-Backend Integration Verification

## Issues Found & Fixed

### 1. ✅ JSON Serialization Mismatch (FIXED)
**Problem:** Backend was using PascalCase by default, frontend expected camelCase
**Fix:** Added `PropertyNamingPolicy = JsonNamingPolicy.CamelCase` to backend `Program.cs`

### 2. ✅ Base URL Configuration (FIXED)
**Problem:** Default was `http://localhost:5000` but backend uses `https://localhost:5000`
**Fix:** Updated default in `axios.ts` and created `.env` file

### 3. ✅ Environment File (CREATED)
**Problem:** `.env` file was missing
**Fix:** Created `.env` with `VITE_API_BASE_URL=https://localhost:5000`

## Verification Checklist

### Backend Configuration
- [x] JSON serialization set to camelCase
- [x] CORS configured to allow all origins
- [x] JWT authentication configured
- [x] All endpoints return `ApiResponse<T>` format

### Frontend Configuration
- [x] Axios base URL configured
- [x] Request interceptor attaches JWT token
- [x] Response interceptor handles 401 and refreshes token
- [x] All API services use correct endpoints
- [x] TypeScript types match backend DTOs

### API Endpoints Verified
- [x] `/auth/login` → `authService.login()`
- [x] `/auth/refresh` → Auto via interceptor
- [x] `/api/dashboard` → `dashboardService.getDashboard()`
- [x] `/api/accounts/me` → `accountsService.getMyAccount()`
- [x] `/api/accounts/me/cards` → `accountsService.getMyCards()`
- [x] `/api/transactions/transfer` → `transactionsService.createTransfer()`

## Testing Steps

1. **Start Backend:**
   ```bash
   cd SuperMemo/SuperMemo.Api
   dotnet run
   ```
   Backend should run on `https://localhost:5000`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Login:**
   - Open browser console (F12)
   - Navigate to `/login`
   - Enter credentials
   - Check console for API calls
   - Verify token is stored in localStorage

4. **Test Dashboard:**
   - After login, should redirect to `/dashboard`
   - Check console for API calls to `/api/dashboard` and `/api/accounts/me`
   - Verify data loads correctly

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** Backend CORS is configured to allow all origins. If still getting CORS errors, check:
- Backend is running on `https://localhost:5000`
- Frontend is making requests to correct URL
- Browser isn't blocking mixed content (http vs https)

### Issue: 401 Unauthorized
**Solution:** 
- Check if token is in localStorage: `localStorage.getItem('accessToken')`
- Verify token format: Should start with `Bearer `
- Check if token expired (backend JWT expiry is 60 minutes)
- Refresh token should auto-refresh on 401

### Issue: Network Error / Connection Refused
**Solution:**
- Verify backend is running: Check `https://localhost:5000/swagger`
- Check `.env` file has correct URL
- Verify no firewall blocking localhost:5000
- Try `http://localhost:5000` if HTTPS certificate issues

### Issue: Response Format Mismatch
**Solution:**
- Backend now uses camelCase (fixed in Program.cs)
- All responses should have `success`, `data`, `message` properties
- Check browser console for actual response structure

## Debug Mode

The axios interceptor now logs all API calls in development mode. Check browser console for:
- Request method and URL
- Response status and data
- Error details

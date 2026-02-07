// Note: Card management endpoints are under /api/admin/cards
// This service is for reference, but cards should be accessed via adminService
// or accountsService.getMyCards() for user's own cards

import { accountsService } from './accounts.service';
import { adminService } from './admin.service';

export const cardsService = {
  // Get my cards (user's own cards)
  getMyCards: accountsService.getMyCards,

  // Admin operations (require Admin role)
  issueCard: adminService.issueCard,
  listCardsByAccount: adminService.listCardsByAccount,
  revokeCard: adminService.revokeCard,
};

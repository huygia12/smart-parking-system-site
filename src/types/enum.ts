enum Role {
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

enum SlotStatus {
  OCCUPIED = "OCCUPIED",
  UNOCCUPIED = "UNOCCUPIED",
}

enum SchemaResponse {
  REQUIRED = "Cannot be blank",
  INVALID = "invalid",
  EMAIL_INVALID = "Invalidate email address",
  PASSWORD_INVALID = "Type at least 6 characters",
}

export { Role, SlotStatus, SchemaResponse };

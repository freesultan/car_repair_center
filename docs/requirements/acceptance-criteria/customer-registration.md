# Customer Registration Feature - Acceptance Criteria

## Feature Description
Allow service advisors to register new customers in the system.

## Acceptance Criteria

1. **Customer Information Capture**
   - System must collect the following mandatory information:
     - نام و نام خانوادگی (Full Name)
     - شماره تلفن همراه (Mobile Phone Number)
   - System should collect the following optional information:
     - ایمیل (Email Address)
     - آدرس (Address)
     - شماره تلفن ثابت (Landline)

2. **Data Validation**
   - Phone numbers must be validated for correct Iranian mobile format
   - Email addresses must be validated for correct format (if provided)
   - System must prevent duplicate customer records based on phone number

3. **User Interface**
   - Form must be presented in Persian language with RTL layout
   - Form must work on both desktop and tablet devices
   - Error messages must be clear and in Persian
   - Successful registration must display confirmation message

4. **Data Storage**
   - Customer information must be stored in the local database
   - Creation timestamp must be recorded
   - Creating user (staff member) must be recorded

5. **Search Functionality**
   - After registration, customer should be searchable by name or phone number
   - Search results should display within 2 seconds

## Definition of Done
- All acceptance criteria are met
- Feature works without internet connection
- Feature is tested on both desktop and tablet devices
- UI follows the design system guidelines
- All text is in Persian language

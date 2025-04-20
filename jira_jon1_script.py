from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up the driver
driver = webdriver.Chrome()  # Assuming ChromeDriver is installed and in PATH

try:
    # Navigate to the website
    driver.get('http://eaapp.somee.com')
    
    # Click the login link
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Login')]"))).click()
    
    # Enter username
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@type='text' or @type='email']"))).send_keys('admin')
    
    # Enter password
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@type='password']"))).send_keys('password')
    
    # Click the login button
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Login') and (self::button or self::a)]"))).click()
    
    # Click Employee List
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Employee List')]"))).click()
    
    # Click Create New
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Create New')]"))).click()
    
    # Enter employee details
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@name='Name' or @placeholder='Name']"))).send_keys('Realistic Name')  # Replace with actual realistic name
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@name='Salary' or @placeholder='Salary']"))).send_keys('50000')  # Example salary
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@name='DurationWorked' or @placeholder='Duration Worked']"))).send_keys('2 years')  # Example duration
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//select[@name='Grade']"))).send_keys('CLevel')  # Select dropdown for Grade
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@name='Email' or @placeholder='Email']"))).send_keys('example@email.com')  # Example email
    
    # Submit the form (assuming a submit button)
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Save') or contains(text(), 'Submit')]"))).click()
    
except Exception as e:
    print(f"An error occurred: {e}")

finally:
    driver.quit()  # Close the browser 
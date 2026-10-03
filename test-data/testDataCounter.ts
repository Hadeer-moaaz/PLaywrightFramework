let employeeCounter = 1000;

export function getNextEmployeeId(): string {
  employeeCounter += 1;
  return employeeCounter.toString();
}
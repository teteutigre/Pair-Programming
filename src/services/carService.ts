import conflictError from "../errors/conflictError.js";
import notFoundError from "../errors/notFoundError.js";
import carRepository, { NewCar } from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(
  model: string,
  licensePlate: string,
  year: number,
  color: string
) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car) {
    throw conflictError(
      `Car with license plate ${licensePlate} already registered.`
    );
  }
  const newCar: NewCar = {
    model,
    licensePlate,
    year: year.toString(),
    color,
  };
  await carRepository.createCar(newCar);
}

async function updateCarService(car: NewCar, id: number) {
  car.year = car.year.toString();
  const existentCar = await carRepository.getCarWithLicensePlate(
    car.licensePlate
  );
  if (existentCar && existentCar.id != id) {
    throw conflictError(
      `Car with license plate ${car.licensePlate} already registered.`
    );
  }

  await carRepository.updateCar(car, id);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCarService,
};

export default carService;

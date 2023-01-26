import { cars } from "@prisma/client";
import { prisma } from "../config/database.js";

async function getCars() {
  const data = await prisma.cars.findMany();
  return data;
}

async function getCar(id: number) {
  const data = await prisma.cars.findFirst({ where: { id } });
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = await prisma.cars.findFirst({ where: { licensePlate } });
  return data;
}

export type NewCar = Omit<cars, "id" | "createAt">;

async function createCar(car: NewCar) {
  await prisma.cars.create({ data: car });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({ where: { id } });
}

async function updateCar(car: NewCar, id: number) {
  await prisma.cars.update({ data: car, where: { id } });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
  updateCar,
};

export default carRepository;

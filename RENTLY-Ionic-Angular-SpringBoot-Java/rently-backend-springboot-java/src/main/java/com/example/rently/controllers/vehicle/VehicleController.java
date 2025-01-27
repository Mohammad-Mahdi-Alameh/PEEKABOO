package com.example.rently.controllers.vehicle;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rently.models.vehicle.Vehicle;
import com.example.rently.services.vehicleService.VehicleService;

@RestController
@RequestMapping("/api/v1/vehicles")
public class VehicleController {

	private VehicleService vehicleService;

	public VehicleController(VehicleService vehicleService) {
		super();
		this.vehicleService = vehicleService;
	}

	// build create vehicle RESTful API
	@PostMapping("/add")
	public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
		return new ResponseEntity<Vehicle>(vehicleService.addVehicle(vehicle), HttpStatus.CREATED);
	}

	// build get all vehicles RESTful API
	@GetMapping
	public List<Vehicle> getAllVehicles() {
		return vehicleService.getAllVehicles();
	}

	// build get vehicle by id RESTful API
	@GetMapping("{id}")
	public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") long vehicleId) {
		return new ResponseEntity<Vehicle>(vehicleService.getVehicleById(vehicleId), HttpStatus.OK);
	}

	// build update vehicle RESTful API
	@PutMapping("/update/{id}")
	public ResponseEntity<Vehicle> updateVehicle(@PathVariable("id") long id, @RequestBody Vehicle vehicle) {
		return new ResponseEntity<Vehicle>(vehicleService.updateVehicle(vehicle, id), HttpStatus.OK);
	}

	// build delete vehicle RESTful API
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteVehicle(@PathVariable("id") long id) {

		// delete vehicle from DB
		vehicleService.deleteVehicle(id);
		return new ResponseEntity<String>("Vehicle deleted successfully!", HttpStatus.OK);
	}

	// build create rent RESTful API
	@PutMapping("/return/{id}")
	public ResponseEntity<String> returnVehicle(@PathVariable("id") long id){
		// resetting vehicle's availability to true
		vehicleService.returnVehicle(id);
		return new ResponseEntity<String>("Vehicle returned successfully!", HttpStatus.OK);
	}
}

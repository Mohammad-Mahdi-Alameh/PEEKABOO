package com.example.rently.repositories.rent;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rently.models.rent.Rent;
import com.example.rently.models.user.User;
import com.example.rently.models.vehicle.Vehicle;
@Repository

public interface RentRepository  extends JpaRepository<Rent, Long> {
    //method to get all rents of a specific user
    List<Rent> findAllByUser(User user);
    //method to count all rents of a specific user
    Integer countByUser(User user);
    //method to count all rents of a specific vehicle
    Integer countByVehicle(Vehicle vehicle);

}

package tsdv.com.miniproject.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tsdv.com.miniproject.model.User;
@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
	
}

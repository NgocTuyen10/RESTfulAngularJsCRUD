package tsdv.com.miniproject.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tsdv.com.miniproject.model.User;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	tsdv.com.miniproject.repo.UserRepository repository;

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return repository.findAll();
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public Optional<User> getByIdUser(@PathVariable("id") int id) {
		Optional<User> user = repository.findById(id);
		return user;
	}

	@PostMapping("/users")
	public User createUser(@Valid @RequestBody User user) {
		return repository.save(user);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
		repository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User user) {

		Optional<User> userData = repository.findById(id);

		if (userData.isPresent()) {
			User _user = userData.get();
			_user.setName(user.getName());
			_user.setEmail(user.getEmail());
			_user.setPassword(user.getPassword());
			_user.setLanguage(user.getLanguage());
			_user.setRole(user.getRole());
			return new ResponseEntity<>(repository.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}

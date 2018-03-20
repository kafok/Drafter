package drafter.beans;

public class Option {
	public String id;
	public String name;
	public String organization;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
	
	public Option(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Option(String id, String name, String organization) {
		super();
		this.id = id;
		this.name = name;
		this.organization = organization;
	}
	
	
}
